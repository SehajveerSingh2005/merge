const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all blog posts (insights)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tag, type } = req.query;
    const skip = (page - 1) * limit;

    const where = { published: true };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (tag) {
      where.tags = { has: tag };
    }

    const blogPosts = await prisma.blogPost.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    const total = await prisma.blogPost.count({ where });

    // Add content type based on tags or content
    const postsWithType = blogPosts.map(post => {
      let contentType = 'article';
      if (post.tags.some(tag => ['news', 'tech-news'].includes(tag.toLowerCase()))) {
        contentType = 'news';
      } else if (post.tags.some(tag => ['tutorial', 'guide', 'how-to'].includes(tag.toLowerCase()))) {
        contentType = 'tutorial';
      } else if (post.tags.some(tag => ['opinion', 'thoughts', 'discussion'].includes(tag.toLowerCase()))) {
        contentType = 'opinion';
      }

      return {
        ...post,
        contentType,
        excerpt: post.excerpt || post.content.substring(0, 200) + '...'
      };
    });

    res.json({
      posts: postsWithType,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get single blog post
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    if (!post || !post.published) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if current user liked the post
    let isLiked = false;
    if (req.user) {
      const like = await prisma.like.findUnique({
        where: {
          userId_blogPostId: {
            userId: req.user.id,
            blogPostId: post.id
          }
        }
      });
      isLiked = !!like;
    }

    res.json({ ...post, isLiked });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create blog post
router.post('/', authenticateToken, [
  body('title').isLength({ min: 1 }).trim(),
  body('content').isLength({ min: 50 }).trim(),
  body('excerpt').optional().isLength({ max: 500 }).trim(),
  body('tags').isArray(),
  body('published').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { title, content, excerpt, tags, published = false } = req.body;

    // Calculate read time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        tags,
        published,
        readTime,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      }
    });

    res.status(201).json({ post });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post
router.put('/:id', authenticateToken, [
  body('title').optional().isLength({ min: 1 }).trim(),
  body('content').optional().isLength({ min: 50 }).trim(),
  body('excerpt').optional().isLength({ max: 500 }).trim(),
  body('tags').optional().isArray(),
  body('published').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    // Check if post exists and user owns it
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: req.params.id }
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (existingPost.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const updateData = { ...req.body };
    
    // Recalculate read time if content changed
    if (req.body.content) {
      const wordCount = req.body.content.split(/\s+/).length;
      updateData.readTime = Math.ceil(wordCount / 200);
    }

    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        }
      }
    });

    res.json({ post });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Like/Unlike blog post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: postId }
    });

    if (!post || !post.published) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogPostId: {
          userId,
          blogPostId: postId
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      res.json({ liked: false, message: 'Post unliked' });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          blogPostId: postId
        }
      });
      res.json({ liked: true, message: 'Post liked' });
    }
  } catch (error) {
    console.error('Like blog post error:', error);
    res.status(500).json({ error: 'Failed to like/unlike post' });
  }
});

module.exports = router;