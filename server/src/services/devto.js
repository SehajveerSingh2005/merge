const fetch = require('node-fetch');
const prisma = require('../config/database');

const DEVTO_API_BASE = 'https://dev.to/api';

class DevToService {
  async fetchArticles(limit = 30) {
    try {
      console.log('📝 Fetching articles from Dev.to...');
      
      // Get latest articles - try without the top parameter first
      const response = await fetch(`${DEVTO_API_BASE}/articles?per_page=${limit}&state=fresh`);
      const articles = await response.json();
      
      console.log(`📊 Dev.to API returned ${articles?.length || 0} articles`);
      
      if (!Array.isArray(articles)) {
        console.error('❌ Dev.to API returned invalid response:', articles);
        return [];
      }
      
      // Log first article for debugging
      if (articles.length > 0) {
        console.log('📝 Sample article:', {
          title: articles[0].title,
          reactions: articles[0].positive_reactions_count,
          comments: articles[0].comments_count,
          published: articles[0].published_at
        });
      }
      
      // Transform and filter articles with more lenient filtering
      const validArticles = articles
        .filter(article => this.isValidArticle(article))
        .map(article => this.transformArticle(article))
        .slice(0, Math.min(limit, 25)); // Limit to 25 max
      
      console.log(`✅ Fetched ${validArticles.length} valid articles from Dev.to (from ${articles.length} total)`);
      return validArticles;
      
    } catch (error) {
      console.error('❌ Error fetching Dev.to articles:', error);
      return [];
    }
  }

  isValidArticle(article) {
    // More lenient filtering for debugging
    const isValid = (
      article &&
      article.title &&
      article.url &&
      article.published_at &&
      article.positive_reactions_count >= 1 && // Lowered from 5 to 1
      article.comments_count >= 0 &&
      !article.title.toLowerCase().includes('spam') &&
      !article.title.toLowerCase().includes('test')
    );
    
    if (!isValid && article) {
      console.log('❌ Article filtered out:', {
        title: article.title?.substring(0, 50),
        reactions: article.positive_reactions_count,
        hasUrl: !!article.url,
        hasPublished: !!article.published_at
      });
    }
    
    return isValid;
  }

  transformArticle(article) {
    return {
      id: `devto-${article.id}`,
      title: article.title,
      url: article.url,
      description: article.description || this.extractDescription(article.title),
      points: article.positive_reactions_count || 0,
      comments: article.comments_count || 0,
      author: article.user?.name || article.user?.username || 'Dev.to User',
      authorUsername: article.user?.username || 'devto',
      authorImage: article.user?.profile_image || '/api/placeholder/40/40',
      tags: article.tag_list || [],
      category: this.categorizeArticle(article),
      createdAt: new Date(article.published_at),
      source: 'devto'
    };
  }

  extractDescription(title) {
    // Create a simple description from title if none provided
    if (title.length > 100) {
      return title.substring(0, 100) + '...';
    }
    return `A developer article about ${title.toLowerCase()}`;
  }

  categorizeArticle(article) {
    const title = article.title.toLowerCase();
    const tags = (article.tag_list || []).map(tag => tag.toLowerCase());
    
    // Tutorial indicators
    const tutorialKeywords = [
      'how to', 'tutorial', 'guide', 'introduction to', 'getting started',
      'beginner', 'learn', 'step by step', 'walkthrough', 'explained',
      'build', 'create', 'make'
    ];
    
    // Opinion/Discussion indicators
    const opinionKeywords = [
      'why', 'thoughts on', 'opinion', 'discussion', 'debate', 'controversial',
      'unpopular', 'hot take', 'rant', 'review', 'comparison'
    ];
    
    // News indicators
    const newsKeywords = [
      'announces', 'launches', 'releases', 'new version', 'update',
      'breaking', 'just released', 'now available'
    ];

    // Check tags first
    if (tags.includes('tutorial') || tags.includes('beginners') || tags.includes('howto')) {
      return 'tutorial';
    }
    
    if (tags.includes('discuss') || tags.includes('opinion') || tags.includes('career')) {
      return 'discussion';
    }
    
    if (tags.includes('news') || tags.includes('release')) {
      return 'news';
    }

    // Check title
    if (tutorialKeywords.some(keyword => title.includes(keyword))) {
      return 'tutorial';
    }
    
    if (opinionKeywords.some(keyword => title.includes(keyword))) {
      return 'discussion';
    }
    
    if (newsKeywords.some(keyword => title.includes(keyword))) {
      return 'news';
    }
    
    // Default to article
    return 'article';
  }

  async syncToDatabase() {
    try {
      console.log('🔄 Syncing Dev.to articles to database...');
      
      // Use a different method for syncing to avoid double filtering
      const articles = await this.fetchArticlesForSync(30);
      
      if (articles.length === 0) {
        console.log('⚠️ No Dev.to articles to sync');
        return;
      }

      // Clear old Dev.to articles (keep only last 50)
      await prisma.newsItem.deleteMany({
        where: {
          source: 'devto',
          createdAt: {
            lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // Older than 14 days
          }
        }
      });

      // Insert new articles
      let syncedCount = 0;
      for (const article of articles) {
        try {
          // Check if article already exists
          const existing = await prisma.newsItem.findFirst({
            where: {
              title: article.title,
              source: 'devto'
            }
          });

          if (!existing) {
            await prisma.newsItem.create({
              data: {
                title: article.title,
                url: article.url,
                points: article.points,
                comments: article.comments,
                author: article.author,
                source: 'devto',
                category: article.category,
                createdAt: article.createdAt,
                updatedAt: new Date()
              }
            });
            syncedCount++;
          }
        } catch (error) {
          console.error(`❌ Error saving Dev.to article "${article.title}":`, error);
        }
      }

      console.log(`✅ Synced ${syncedCount} new Dev.to articles to database`);
      
      // Return total count
      const totalCount = await prisma.newsItem.count({
        where: { source: 'devto' }
      });
      
      console.log(`📊 Total Dev.to articles in database: ${totalCount}`);
      
    } catch (error) {
      console.error('❌ Error syncing Dev.to articles:', error);
    }
  }

  async fetchArticlesForSync(limit = 30) {
    try {
      console.log('📝 Fetching articles from Dev.to for sync...');
      
      // Get latest articles - simpler approach for sync
      const response = await fetch(`${DEVTO_API_BASE}/articles?per_page=${limit}`);
      const articles = await response.json();
      
      console.log(`📊 Dev.to API returned ${articles?.length || 0} articles for sync`);
      
      if (!Array.isArray(articles)) {
        console.error('❌ Dev.to API returned invalid response:', articles);
        return [];
      }
      
      // More lenient filtering for sync
      const validArticles = articles
        .filter(article => (
          article &&
          article.title &&
          article.url &&
          article.published_at &&
          !article.title.toLowerCase().includes('spam')
        ))
        .map(article => this.transformArticle(article))
        .slice(0, Math.min(limit, 25));
      
      console.log(`✅ Processed ${validArticles.length} articles for sync`);
      return validArticles;
      
    } catch (error) {
      console.error('❌ Error fetching Dev.to articles for sync:', error);
      return [];
    }
  }

  async startPeriodicSync(intervalMinutes = 60) {
    console.log(`🔄 Starting periodic Dev.to sync every ${intervalMinutes} minutes`);
    
    // Initial sync
    await this.syncToDatabase();
    
    // Set up periodic sync
    setInterval(async () => {
      await this.syncToDatabase();
    }, intervalMinutes * 60 * 1000);
  }
}

module.exports = new DevToService();