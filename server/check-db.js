const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    const projects = await prisma.project.count();
    const blogPosts = await prisma.blogPost.count();
    const newsItems = await prisma.newsItem.count();
    const hnItems = await prisma.newsItem.count({ where: { source: 'hackernews' } });
    const devtoItems = await prisma.newsItem.count({ where: { source: 'devto' } });
    
    console.log('📊 Database counts:');
    console.log('Projects:', projects);
    console.log('Blog Posts:', blogPosts);
    console.log('News Items:', newsItems);
    console.log('  - Hacker News:', hnItems);
    console.log('  - Dev.to:', devtoItems);
    
    if (newsItems > 0) {
      const news = await prisma.newsItem.findMany({ take: 3 });
      console.log('\n📰 Sample news items:');
      news.forEach(n => console.log(`- ${n.title}`));
    }
    
    if (projects > 0) {
      const projectSample = await prisma.project.findMany({ take: 2 });
      console.log('\n🚀 Sample projects:');
      projectSample.forEach(p => console.log(`- ${p.name}`));
    }
    
    if (blogPosts > 0) {
      const blogSample = await prisma.blogPost.findMany({ take: 2 });
      console.log('\n📝 Sample blog posts:');
      blogSample.forEach(b => console.log(`- ${b.title}`));
    }
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkData();