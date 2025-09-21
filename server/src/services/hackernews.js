const fetch = require('node-fetch');
const prisma = require('../config/database');

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

class HackerNewsService {
  async fetchTopStories(limit = 50) {
    try {
      console.log('🔥 Fetching top stories from Hacker News...');
      
      // Get top story IDs
      const response = await fetch(`${HN_API_BASE}/topstories.json`);
      const storyIds = await response.json();
      
      // Get first 'limit' stories (increased to get more after filtering)
      const topStoryIds = storyIds.slice(0, limit);
      
      // Fetch story details
      const stories = await Promise.all(
        topStoryIds.map(id => this.fetchStory(id))
      );
      
      // Filter out null stories and non-tech content
      const validStories = stories
        .filter(story => story && this.isTechRelated(story))
        .slice(0, Math.min(limit, 30)); // Increased to 30 max
      
      console.log(`✅ Fetched ${validStories.length} tech stories from HN`);
      return validStories;
      
    } catch (error) {
      console.error('❌ Error fetching HN stories:', error);
      return [];
    }
  }

  async fetchStory(id) {
    try {
      const response = await fetch(`${HN_API_BASE}/item/${id}.json`);
      const story = await response.json();
      
      // Only return stories (not jobs, polls, etc.)
      if (story && story.type === 'story' && story.title && !story.deleted) {
        const storyData = {
          id: story.id,
          title: story.title,
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          points: story.score || 0,
          comments: story.descendants || 0,
          author: story.by || 'anonymous',
          createdAt: new Date(story.time * 1000), // Convert Unix timestamp
        };
        
        // Add category
        storyData.category = this.categorizeStory(storyData);
        
        return storyData;
      }
      
      return null;
    } catch (error) {
      console.error(`❌ Error fetching story ${id}:`, error);
      return null;
    }
  }

  isTechRelated(story) {
    const techKeywords = [
      'javascript', 'python', 'react', 'node', 'typescript', 'rust', 'go', 'java',
      'programming', 'developer', 'coding', 'software', 'web', 'api', 'database',
      'ai', 'machine learning', 'ml', 'algorithm', 'framework', 'library',
      'github', 'open source', 'tech', 'startup', 'app', 'mobile', 'frontend',
      'backend', 'devops', 'cloud', 'aws', 'docker', 'kubernetes', 'security',
      'blockchain', 'crypto', 'data', 'analytics', 'performance', 'optimization',
      'bug', 'release', 'version', 'update', 'launch', 'beta', 'alpha',
      'webassembly', 'wasm', 'css', 'html', 'sql', 'nosql', 'mongodb', 'redis',
      'graphql', 'rest', 'microservices', 'serverless', 'edge', 'cdn'
    ];
    
    const titleLower = story.title.toLowerCase();
    const urlLower = (story.url || '').toLowerCase();
    
    return techKeywords.some(keyword => 
      titleLower.includes(keyword) || urlLower.includes(keyword)
    );
  }

  categorizeStory(story) {
    const title = story.title.toLowerCase();
    const url = (story.url || '').toLowerCase();
    
    // News indicators
    const newsKeywords = [
      'announces', 'launches', 'releases', 'acquires', 'funding', 'raises',
      'shuts down', 'discontinues', 'breaking', 'report', 'study shows',
      'survey', 'data breach', 'vulnerability', 'security flaw'
    ];
    
    // Tutorial/Guide indicators  
    const tutorialKeywords = [
      'how to', 'tutorial', 'guide', 'introduction to', 'getting started',
      'beginner', 'learn', 'step by step', 'walkthrough', 'explained'
    ];
    
    // Discussion indicators
    const discussionKeywords = [
      'ask hn', 'show hn', 'what do you think', 'thoughts on', 'discussion',
      'anyone else', 'why does', 'what is your', 'poll'
    ];
    
    if (newsKeywords.some(keyword => title.includes(keyword))) {
      return 'news';
    }
    
    if (tutorialKeywords.some(keyword => title.includes(keyword))) {
      return 'tutorial';
    }
    
    if (discussionKeywords.some(keyword => title.includes(keyword))) {
      return 'discussion';
    }
    
    // Check URL patterns
    if (url.includes('blog') || url.includes('medium.com') || url.includes('dev.to')) {
      return 'article';
    }
    
    if (url.includes('github.com') && (url.includes('/releases') || title.includes('release'))) {
      return 'news';
    }
    
    // Default to article for most content
    return 'article';
  }

  async syncToDatabase() {
    try {
      console.log('🔄 Syncing Hacker News stories to database...');
      
      const stories = await this.fetchTopStories(40);
      
      if (stories.length === 0) {
        console.log('⚠️ No stories to sync');
        return;
      }

      // Clear old news items (keep only last 50)
      await prisma.newsItem.deleteMany({
        where: {
          source: 'hackernews',
          createdAt: {
            lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Older than 7 days
          }
        }
      });

      // Insert new stories
      let syncedCount = 0;
      for (const story of stories) {
        try {
          // Check if story already exists
          const existing = await prisma.newsItem.findFirst({
            where: {
              title: story.title,
              source: 'hackernews'
            }
          });

          if (!existing) {
            await prisma.newsItem.create({
              data: {
                title: story.title,
                url: story.url,
                points: story.points,
                comments: story.comments,
                author: story.author,
                source: 'hackernews',
                category: story.category,
                createdAt: story.createdAt,
                updatedAt: new Date()
              }
            });
            syncedCount++;
          }
        } catch (error) {
          console.error(`❌ Error saving story "${story.title}":`, error);
        }
      }

      console.log(`✅ Synced ${syncedCount} new stories to database`);
      
      // Return total count
      const totalCount = await prisma.newsItem.count({
        where: { source: 'hackernews' }
      });
      
      console.log(`📊 Total HN stories in database: ${totalCount}`);
      
    } catch (error) {
      console.error('❌ Error syncing HN stories:', error);
    }
  }

  async startPeriodicSync(intervalMinutes = 30) {
    console.log(`🔄 Starting periodic HN sync every ${intervalMinutes} minutes`);
    
    // Initial sync
    await this.syncToDatabase();
    
    // Set up periodic sync
    setInterval(async () => {
      await this.syncToDatabase();
    }, intervalMinutes * 60 * 1000);
  }
}

module.exports = new HackerNewsService();