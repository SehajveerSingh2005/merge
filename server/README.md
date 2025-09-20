# Developer Platform Backend

A comprehensive Node.js/Express backend API for the developer platform with authentication, social features, and content management.

## 🚀 Features

- **Authentication System** - JWT-based auth with registration/login
- **User Management** - Profiles, following/followers, social features
- **Content Management** - Projects, blog posts (insights), news aggregation
- **Social Features** - Likes, comments, messaging, notifications
- **Feed System** - Mixed content feed with trending algorithms
- **Database** - PostgreSQL with Prisma ORM

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # Prisma client configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── users.js             # User management
│   │   ├── projects.js          # Project CRUD operations
│   │   ├── blogs.js             # Blog/insights management
│   │   ├── feed.js              # Mixed content feed
│   │   ├── messages.js          # Direct messaging
│   │   └── notifications.js     # Notification system
│   ├── index.js                 # Express server setup
│   └── seed.js                  # Database seeding script
├── prisma/
│   └── schema.prisma            # Database schema
├── .env.example                 # Environment variables template
└── package.json                 # Dependencies and scripts
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and JWT secret
   ```

3. **Set up database:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:username/follow` - Follow/unfollow user
- `GET /api/users/:username/followers` - Get followers
- `GET /api/users/:username/following` - Get following

### Feed
- `GET /api/feed` - Get mixed content feed
- `GET /api/feed/trending` - Get trending tags

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/like` - Like/unlike project

### Blog Posts (Insights)
- `GET /api/blogs` - List blog posts
- `GET /api/blogs/:id` - Get single post
- `POST /api/blogs` - Create post
- `PUT /api/blogs/:id` - Update post
- `POST /api/blogs/:id/like` - Like/unlike post

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message
- `GET /api/messages/unread/count` - Get unread count

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🧪 Test Users

The seed script creates these test users (password: `password123`):

- **sarah@example.com** / `neural_dev` - AI/ML developer
- **alex@example.com** / `code_poet` - Clean code advocate  
- **emma@example.com** / `quantum_coder` - Quantum computing researcher
- **maya@example.com** / `maya_builds` - Frontend architect

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation with express-validator
- SQL injection protection via Prisma

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use a production PostgreSQL database
3. Set secure JWT_SECRET
4. Configure proper CORS origins
5. Set up SSL/HTTPS
6. Use process manager (PM2)

## 📊 Database Schema

The database includes models for:
- Users (with social features)
- Projects (with GitHub integration)
- Blog Posts (insights/articles)
- Comments & Likes
- Messages & Notifications
- News Items
- Follow relationships
- Collaboration requests

See `prisma/schema.prisma` for the complete schema definition.