const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:username', optionalAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        githubUsername: true,
        createdAt: true,
        projects: {
          orderBy: { createdAt: 'desc' },
          take: 6,
          include: {
            _count: {
              select: {
                likes: true,
                comments: true
              }
            }
          }
        },
        blogPosts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' },
          take: 3,
          include: {
            _count: {
              select: {
                likes: true,
                comments: true
              }
            }
          }
        },
        _count: {
          select: {
            followers: true,
            following: true,
            projects: true,
            blogPosts: { where: { published: true } }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if current user is following this user
    let isFollowing = false;
    if (req.user && req.user.id !== user.id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: req.user.id,
            followingId: user.id
          }
        }
      });
      isFollowing = !!follow;
    }

    res.json({ ...user, isFollowing });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, [
  body('name').optional().isLength({ min: 1 }).trim(),
  body('bio').optional().isLength({ max: 500 }).trim(),
  body('location').optional().isLength({ max: 100 }).trim(),
  body('website').optional().isURL(),
  body('githubUsername').optional().matches(/^[a-zA-Z0-9_-]+$/)
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { name, bio, location, website, githubUsername } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        bio,
        location,
        website,
        githubUsername
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        githubUsername: true
      }
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Follow/Unfollow user
router.post('/:username/follow', authenticateToken, async (req, res) => {
  try {
    const targetUser = await prisma.user.findUnique({
      where: { username: req.params.username }
    });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.user.id,
          followingId: targetUser.id
        }
      }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });
      res.json({ following: false, message: 'Unfollowed user' });
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: req.user.id,
          followingId: targetUser.id
        }
      });
      res.json({ following: true, message: 'Following user' });
    }
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ error: 'Failed to follow/unfollow user' });
  }
});

// Get user's followers
router.get('/:username/followers', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
      where: { username: req.params.username }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followers = await prisma.follow.findMany({
      where: { followingId: user.id },
      skip,
      take: parseInt(limit),
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.follow.count({
      where: { followingId: user.id }
    });

    res.json({
      followers: followers.map(f => f.follower),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
});

// Get user's following
router.get('/:username/following', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
      where: { username: req.params.username }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const following = await prisma.follow.findMany({
      where: { followerId: user.id },
      skip,
      take: parseInt(limit),
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.follow.count({
      where: { followerId: user.id }
    });

    res.json({
      following: following.map(f => f.following),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Failed to fetch following' });
  }
});

module.exports = router;