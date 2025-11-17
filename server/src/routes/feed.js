const express = require('express');
const prisma = require('../config/database');
const { optionalAuth } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// Get feed items (projects, blog posts, news)
router.get('/', optionalAuth, cacheMiddleware(300), async (req, res) => { // Cache for 5 minutes
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (page - 1) * limit;
    const requestedLimit = parseInt(limit);

    let feedItems = [];

    if (type) {
      // Single type request
      if (type === 'project') {
        const projects = await prisma.project.findMany({
          skip,
          take: requestedLimit,
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

        feedItems = projects.map(project => ({
          ...project,
          type: 'project',
          stats: {
            stars: project.stars,
            forks: project.forks,
            likes: project._count.likes,
            comments: project._count.comments
          }
        }));
      } else if (type === 'blog') {
        const blogPosts = await prisma.blogPost.findMany({
          skip,
          take: requestedLimit,
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

        feedItems = blogPosts.map(post => ({
          ...post,
          type: 'blog',
          description: post.excerpt || post.content.substring(0, 200) + '...',
          stats: {
            likes: post._count.likes,
            comments: post._count.comments,
            readTime: post.readTime || Math.ceil(post.content.length / 1000)
          }
        }));
      } else if (type === 'news') {
        const newsItems = await prisma.newsItem.findMany({
          skip,
          take: requestedLimit,
          orderBy: { createdAt: 'desc' }
        });

        feedItems = newsItems.map(item => ({
          ...item,
          type: item.category || 'news',
          description: `${item.points} points • ${item.comments} comments`,
          source: item.source, // Use actual source
          author: {
            name: item.author || (item.source === 'devto' ? 'Dev.to' : 'Tech News'),
            username: item.source === 'devto' ? 'devto' : 'technews',
            image: '/api/placeholder/40/40'
          },
          stats: {
            points: item.points,
            comments: item.comments
          }
        }));
      }
    } else {
      // Mixed feed - get all items and paginate after sorting
      
      // Get projects
      const projects = await prisma.project.findMany({
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

      // Get blog posts
      const blogPosts = await prisma.blogPost.findMany({
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

      // Get news items
      const newsItems = await prisma.newsItem.findMany({
        orderBy: { createdAt: 'desc' }
      });

      feedItems.push(...newsItems.map(item => ({
        ...item,
        type: item.category || 'article', // Use the actual category
        description: `${item.points} points • ${item.comments} comments`,
        source: item.source, // Use the actual source from database
        author: {
          name: item.author || (item.source === 'devto' ? 'Dev.to' : 'Hacker News'),
          username: item.source === 'devto' ? 'devto' : 'hackernews',
          image: '/api/placeholder/40/40'
        },
        stats: {
          points: item.points,
          comments: item.comments
        }
      })));

      // Sort by creation date and apply pagination
      feedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Apply pagination to the sorted mixed feed
      const totalMixedItems = feedItems.length;
      feedItems = feedItems.slice(skip, skip + requestedLimit);

      // Store hasMore for mixed feed
      var mixedHasMore = skip + requestedLimit < totalMixedItems;
    }

    // Add time ago and featured status
    feedItems = feedItems.map(item => ({
      ...item,
      timeAgo: getTimeAgo(item.createdAt),
      featured: item.featured || false
    }));

    // Calculate if there are more items
    const hasMore = type ? feedItems.length === requestedLimit : mixedHasMore;
    
    res.json({
      items: feedItems,
      pagination: {
        page: parseInt(page),
        limit: requestedLimit,
        hasMore,
        total: feedItems.length
      }
    });
  } catch (error) {
    console.error('Feed error:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// Get trending tags
router.get('/trending', cacheMiddleware(1800), async (req, res) => { // Cache for 30 minutes
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