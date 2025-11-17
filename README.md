# Merge - Developer Social Platform

A social platform for developers to showcase projects, write blogs, and stay updated with tech news.

<img width="1666" height="1042" alt="image" src="https://github.com/user-attachments/assets/4216a692-661d-48f8-9ac0-d7347d2e24c8" />
<img width="1666" height="1042" alt="image" src="https://github.com/user-attachments/assets/b412f527-e786-48f4-8550-d484102c5e9e" />


## Features

- **GitHub Integration**: Sign in with GitHub and auto-sync your repositories
- **Project Showcase**: Display your projects with rich previews and descriptions
- **Project Sharing**: Share your own projects with the community via URL import or GitHub integration
- **Developer Blogs**: Write and share technical articles with markdown support
- **Tech News Feed**: Stay updated with curated news from Hacker News, Dev.to, and other sources
- **Social Features**: Follow developers, like posts, and collaborate on projects
- **Messaging**: Direct messaging system for collaboration
- **Notifications**: Get notified about likes, follows, and collaboration requests
- **User Profiles**: Comprehensive profiles with GitHub integration and activity tracking
- **Real-time Updates**: Live notifications and feed updates
- **Content Management**: Create, edit, and manage projects and blog posts
- **Search & Filtering**: Find users, projects, and content easily
- **API Endpoints**: RESTful API for all major features
- **Database Integration**: Full-featured database with Prisma ORM
- **Authentication & Authorization**: Secure user authentication with role-based access
- **File Uploads**: Support for profile pictures and content images

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon), Prisma Migrate
- **Authentication**: NextAuth.js with GitHub OAuth
- **API Services**: GitHub API, Hacker News API, Dev.to API integration
- **Deployment**: Vercel (recommended)
- **Development Tools**: Prisma Studio, ESLint, Prettier, Biome
- **UI Components**: shadcn/ui, custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon account)
- GitHub OAuth App

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd merge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: A random secret for NextAuth.js
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: From your GitHub OAuth App

### Database Setup

1. Initialize Prisma:
```bash
npx prisma generate
```

2. Run database migrations:
```bash
npx prisma db push
```

3. (Optional) Seed the database:
```bash
npx prisma db seed
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── auth/              # Authentication pages
│   ├── home/              # Home feed
│   ├── profile/           # User profiles
│   ├── projects/          # Project showcase
│   ├── blogs/             # Blog posts
│   ├── notifications/     # Notifications
│   └── messages/          # Direct messaging
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── server/               # Backend server implementation
│   ├── src/
│   │   ├── config/       # Server configuration
│   │   ├── middleware/   # Authentication and other middleware
│   │   ├── routes/       # API route handlers
│   │   └── services/     # External API integrations (GitHub, Hacker News, Dev.to)
│   └── prisma/           # Server-side database schema
```

## Backend Architecture

The backend is implemented as a separate Node.js/Express.js server with the following components:

- **Routes**: RESTful API endpoints for users, projects, blogs, news, messages, and notifications
- **Services**: Integration with external APIs including GitHub, Hacker News, and Dev.to
- **Middleware**: Authentication, authorization, and validation layers
- **Configuration**: Database connection, environment variables, and security settings
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations

## MVP Features Implemented

- [x] Landing page with modern design
- [x] GitHub OAuth authentication flow
- [x] Home feed with news, featured projects, and blogs
- [x] User profiles with GitHub integration
- [x] Project showcase pages with search and filtering
- [x] Project sharing feature (import from GitHub or add via URL)
- [x] Blog listing and reading
- [x] Notifications system
- [x] Basic messaging interface
- [x] Responsive design with dark/light mode
- [x] Database schema with Prisma

## Next Steps

1. **Advanced Search**: Implement full-text search across users, projects, and content
2. **Real-time Features**: Add WebSocket support for live notifications and chat
3. **Content Creation**: Enhance forms for creating projects and blogs with rich text editor
4. **File Uploads**: Add image upload for profiles and posts with cloud storage
5. **Performance**: Add caching and optimization strategies
6. **Testing**: Implement comprehensive unit and integration tests
7. **Analytics**: Add user activity tracking and content analytics
8. **Mobile Responsiveness**: Further optimize for mobile devices
9. **Accessibility**: Improve accessibility features and compliance
10. **Advanced User Features**: Add user settings, privacy controls, and account management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
