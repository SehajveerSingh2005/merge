const express = require('express');
const hackerNewsService = require('../services/hackernews');
const devToService = require('../services/devto');
const prisma = require('../config/database');

const router = express.Router();

// Manual sync endpoint for testing
router.post('/sync-hackernews', async (req, res) => {
  try {
    console.log('🔄 Manual HN sync requested');
    await hackerNewsService.syncToDatabase();
    
    const count = await prisma.newsItem.count({
      where: { source: 'hackernews' }
    });
    
    res.json({ 
      message: 'Hacker News sync completed',
      totalStories: count
    });
  } catch (error) {
    console.error('❌ Manual sync failed:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Test Dev.to API endpoint
router.get('/test-devto', async (req, res) => {
  try {
    console.log('🧪 Testing Dev.to API...');
    const articles = await devToService.fetchArticles(5);
    
    res.json({ 
      message: 'Dev.to API test',
      articlesFound: articles.length,
      sampleTitles: articles.slice(0, 3).map(a => a.title)
    });
  } catch (error) {
    console.error('❌ Dev.to API test failed:', error);
    res.status(500).json({ error: 'Test failed' });
  }
});

// Manual Dev.to sync endpoint
router.post('/sync-devto', async (req, res) => {
  try {
    console.log('🔄 Manual Dev.to sync requested');
    await devToService.syncToDatabase();
    
    const count = await prisma.newsItem.count({
      where: { source: 'devto' }
    });
    
    res.json({ 
      message: 'Dev.to sync completed',
      totalArticles: count
    });
  } catch (error) {
    console.error('❌ Manual Dev.to sync failed:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Get latest HN stories
router.get('/hackernews', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const stories = await prisma.newsItem.findMany({
      where: { source: 'hackernews' },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit)
    });
    
    res.json({ stories });
  } catch (error) {
    console.error('❌ Error fetching HN stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Get latest Dev.to articles
router.get('/devto', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const articles = await prisma.newsItem.findMany({
      where: { source: 'devto' },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit)
    });
    
    res.json({ 
      articles,
      count: articles.length,
      sampleTitles: articles.slice(0, 3).map(a => a.title)
    });
  } catch (error) {
    console.error('❌ Error fetching Dev.to articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

module.exports = router;