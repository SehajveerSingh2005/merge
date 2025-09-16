# Merge - Developer Social Platform

A social platform for developers to showcase projects, write blogs, and stay updated with tech news.

## Features

- **GitHub Integration**: Sign in with GitHub and auto-sync your repositories
- **Project Showcase**: Display your projects with rich previews and descriptions
- **Developer Blogs**: Write and share technical articles with markdown support
- **Tech News Feed**: Stay updated with curated news from Hacker News
- **Social Features**: Follow developers, like posts, and collaborate on projects
- **Messaging**: Direct messaging system for collaboration
- **Notifications**: Get notified about likes, follows, and collaboration requests

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js with GitHub OAuth
- **Deployment**: Vercel (recommended)

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
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## MVP Features Implemented

- [x] Landing page with modern design
- [x] GitHub OAuth authentication flow
- [x] Home feed with news, featured projects, and blogs
- [x] User profiles with GitHub integration
- [x] Project showcase pages
- [x] Blog listing and reading
- [x] Notifications system
- [x] Basic messaging interface
- [x] Responsive design with dark/light mode
- [x] Database schema with Prisma

## Next Steps

1. **Backend Integration**: Connect pages to actual API endpoints
2. **GitHub API**: Implement real GitHub data fetching
3. **Hacker News API**: Add real news feed integration
4. **Authentication**: Set up NextAuth.js with GitHub provider
5. **Database**: Deploy PostgreSQL and run migrations
6. **Real-time Features**: Add WebSocket support for messaging
7. **Search & Filtering**: Implement search functionality
8. **Content Creation**: Add forms for creating projects and blogs
9. **File Uploads**: Add image upload for profiles and posts
10. **Performance**: Add caching and optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.