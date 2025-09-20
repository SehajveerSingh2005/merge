const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up the backend...');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');
  fs.copyFileSync(path.join(__dirname, '.env.example'), envPath);
  console.log('⚠️  Please update the .env file with your database URL and JWT secret!');
  console.log('   DATABASE_URL="postgresql://username:password@localhost:5432/devplatform"');
  console.log('   JWT_SECRET="your-super-secret-jwt-key-here"');
  return;
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('🔧 Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });

  console.log('🗄️  Pushing database schema...');
  execSync('npm run db:push', { stdio: 'inherit' });

  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('✅ Setup complete! You can now run:');
  console.log('   npm run dev');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n💡 Make sure you have:');
  console.log('   1. PostgreSQL running');
  console.log('   2. Correct DATABASE_URL in .env');
  console.log('   3. JWT_SECRET set in .env');
}