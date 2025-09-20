const express = require('express');
const prisma = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get feed items (projects, blog posts, news)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (page - 1) * limit;

    let feedItems = [];

    // Get projects
    if (!type || type === 'project') {
      const projects = await prisma.project.findMany({
        skip: type === 'project' ? skip : 0,
        take: type === 'project' ? parseInt(limit) : 5,
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

      feedItems.push(...projects.map(project => ({
        ...project,
        type: 'project',
        stats: {
          stars: project.stars,
          forks: project.forks,
          likes: project._count.likes,
          comments: project._count.comments
        }
      })));
    }

    // Get blog posts
    if (!type || type === 'blog') {
      const blogPosts = await prisma.blogPost.findMany({
        skip: type === 'blog' ? skip : 0,
        take: type === 'blog' ? parseInt(limit) : 5,
        where: { published: true },
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

      feedItems.push(...blogPosts.map(post => ({
        ...post,
        type: 'blog',
        description: post.excerpt || post.content.substring(0, 200) + '...',
        stats: {
          likes: post._count.likes,
          comments: post._count.comments,
          readTime: post.readTime || Math.ceil(post.content.length / 1000)
        }
      })));
    }

    // Get news items
    if (!type || type === 'news') {
      const newsItems = await prisma.newsItem.findMany({
        skip: type === 'news' ? skip : 0,
        take: type === 'news' ? parseInt(limit) : 3,
        orderBy: { createdAt: 'desc' }
      });

      feedItems.push(...newsItems.map(item => ({
        ...item,
        type: 'news',
        description: `${item.points} points • ${item.comments} comments`,
        author: {
          name: item.author || 'Tech News',
          username: 'technews',
          image: '/api/placeholder/40/40'
        },
        stats: {
          points: item.points,
          comments: item.comments
        }
      })));
    }

    // Sort by creation date if mixed feed
    if (!type) {
      feedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      feedItems = feedItems.slice(0, parseInt(limit));
    }

    // Add time ago and featured status
    feedItems = feedItems.map(item => ({
      ...item,
      timeAgo: getTimeAgo(item.createdAt),
      featured: item.featured || false
    }));

    res.json({
      items: feedItems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: feedItems.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Feed error:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// Get trending tags
router.get('/trending', async (req, res) => {
  try {
    // Get tags from projects and blog posts
    const projects = await prisma.project.findMany({
      select: { tags: true },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    });

    const blogPosts = await prisma.blogPost.findMany({
      select: { tags: true },
      where: {
        published: true,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    // Count tag occurrences
    const tagCounts = {};
    [...projects, ...blogPosts].forEach(item => {
      item.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Sort and format trending tags
    const trendingTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    res.json({ tags: trendingTags });
  } catch (error) {
    console.error('Trending tags error:', error);
    res.status(500).json({ error: 'Failed to fetch trending tags' });
  }
});

// Helper function to calculate time ago
function getTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return new Date(date).toLocaleDateString();
}

module.exports = router;