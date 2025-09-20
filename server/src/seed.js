const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash default password for all users
  const defaultPassword = await bcrypt.hash('password123', 12);

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah@example.com',
        username: 'neural_dev',
        name: 'Sarah Chen',
        password: defaultPassword,
        bio: 'Full-stack developer passionate about AI and neural networks',
        location: 'San Francisco, CA',
        website: 'https://sarahchen.dev',
        githubUsername: 'sarahchen',
        image: '/api/placeholder/40/40'
      }
    }),
    prisma.user.create({
      data: {
        email: 'alex@example.com',
        username: 'code_poet',
        name: 'Alex Rodriguez',
        password: defaultPassword,
        bio: 'Clean code enthusiast and software architect',
        location: 'New York, NY',
        githubUsername: 'alexrod',
        image: '/api/placeholder/40/40'
      }
    }),
    prisma.user.create({
      data: {
        email: 'emma@example.com',
        username: 'quantum_coder',
        name: 'Emma Davis',
        password: defaultPassword,
        bio: 'Quantum computing researcher and React developer',
        location: 'Boston, MA',
        website: 'https://emmadavis.io',
        githubUsername: 'emmadavis',
        image: '/api/placeholder/40/40'
      }
    }),
    prisma.user.create({
      data: {
        email: 'maya@example.com',
        username: 'maya_builds',
        name: 'Maya Patel',
        password: defaultPassword,
        bio: 'Building the future of web interfaces',
        location: 'Seattle, WA',
        githubUsername: 'mayapatel',
        image: '/api/placeholder/40/40'
      }
    })
  ]);

  console.log('✅ Created users');

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Neural Network Visualizer',
        description: 'Real-time visualization of neural network training processes built with Three.js and WebGL shaders. Features interactive 3D models, real-time data streaming, and customizable network architectures.',
        githubUrl: 'https://github.com/sarahchen/neural-viz',
        demoUrl: 'https://neural-viz.demo.com',
        language: 'TypeScript',
        tags: ['TypeScript', 'WebGL', 'Three.js', 'AI', 'Visualization'],
        stars: 2147,
        forks: 234,
        featured: true,
        authorId: users[0].id
      }
    }),
    prisma.project.create({
      data: {
        name: 'Quantum State Manager',
        description: 'State management library inspired by quantum mechanics principles. Superposition meets React with predictable state mutations and quantum-inspired debugging tools.',
        githubUrl: 'https://github.com/emmadavis/quantum-state',
        demoUrl: 'https://quantum-state.demo.com',
        language: 'JavaScript',
        tags: ['React', 'Quantum', 'State Management', 'JavaScript'],
        stars: 1834,
        forks: 156,
        authorId: users[2].id
      }
    }),
    prisma.project.create({
      data: {
        name: 'Code Poetry Engine',
        description: 'Transform your code into beautiful, readable poetry. An experimental tool that analyzes code structure and generates poetic representations.',
        githubUrl: 'https://github.com/alexrod/code-poetry',
        language: 'Python',
        tags: ['Python', 'NLP', 'Code Analysis', 'Art'],
        stars: 892,
        forks: 67,
        authorId: users[1].id
      }
    })
  ]);

  console.log('✅ Created projects');

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Art of Writing Readable Code',
        content: `# The Art of Writing Readable Code

Code is read far more often than it is written. This fundamental truth should guide every decision we make as developers. In this post, I'll explore the philosophy behind clean code and how it impacts team productivity and maintainability.

## Why Readability Matters

When we write code, we're not just communicating with computers—we're communicating with future developers, including our future selves. Readable code is:

- **Maintainable**: Easy to modify and extend
- **Debuggable**: Issues are easier to identify and fix
- **Collaborative**: Team members can quickly understand and contribute
- **Scalable**: Grows gracefully with project complexity

## Principles of Clean Code

### 1. Meaningful Names
Choose names that reveal intent. Instead of \`d\` or \`data\`, use \`userProfile\` or \`customerOrder\`.

### 2. Small Functions
Functions should do one thing and do it well. If you can't describe what a function does in a single sentence, it's probably too complex.

### 3. Consistent Formatting
Use consistent indentation, spacing, and naming conventions throughout your codebase.

## Conclusion

Writing readable code is an investment in your project's future. It may take slightly longer upfront, but it pays dividends in reduced debugging time, faster feature development, and improved team collaboration.`,
        excerpt: 'Exploring the philosophy behind clean code and how it impacts team productivity and maintainability.',
        published: true,
        tags: ['Clean Code', 'Philosophy', 'Best Practices', 'Software Engineering'],
        readTime: 8,
        authorId: users[1].id
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Building Real-Time 3D Visualizations with WebGL',
        content: `# Building Real-Time 3D Visualizations with WebGL

WebGL opens up incredible possibilities for creating immersive, interactive experiences directly in the browser. In this tutorial, I'll walk you through building a real-time 3D neural network visualizer.

## Getting Started with Three.js

Three.js abstracts away much of WebGL's complexity while still giving you access to powerful 3D rendering capabilities.

\`\`\`javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
\`\`\`

## Creating Dynamic Geometries

For neural network visualization, we need to create nodes and connections that can update in real-time based on training data.

## Performance Optimization

Real-time 3D graphics require careful attention to performance. Here are key strategies I've learned...`,
        excerpt: 'Learn how to create immersive 3D visualizations using WebGL and Three.js for real-time data representation.',
        published: true,
        tags: ['WebGL', 'Three.js', 'Tutorial', 'Visualization', 'JavaScript'],
        readTime: 12,
        authorId: users[0].id
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Quantum Computing Meets Web Development',
        content: `# Quantum Computing Meets Web Development

As quantum computing becomes more accessible, web developers need to understand how quantum principles can inspire new approaches to state management and user interfaces.

## Quantum Superposition in State Management

Traditional state management follows classical computing principles—a variable has a definite value at any given time. But what if we could embrace quantum superposition?

## Implementation Challenges

Building quantum-inspired web applications presents unique challenges...`,
        excerpt: 'Exploring how quantum computing principles can revolutionize web development and state management.',
        published: true,
        tags: ['Quantum Computing', 'Web Development', 'Innovation', 'Future Tech'],
        readTime: 15,
        authorId: users[2].id
      }
    })
  ]);

  console.log('✅ Created blog posts');

  // Create sample news items
  const newsItems = await Promise.all([
    prisma.newsItem.create({
      data: {
        title: 'Rust Foundation Announces New Memory Safety Initiative',
        url: 'https://foundation.rust-lang.org/news/memory-safety-initiative',
        points: 342,
        comments: 67,
        author: 'rustfoundation',
        source: 'hackernews'
      }
    }),
    prisma.newsItem.create({
      data: {
        title: 'GitHub Copilot Now Supports 40+ Programming Languages',
        url: 'https://github.blog/copilot-languages-update',
        points: 289,
        comments: 45,
        author: 'github',
        source: 'hackernews'
      }
    }),
    prisma.newsItem.create({
      data: {
        title: 'WebAssembly 2.0 Specification Released',
        url: 'https://webassembly.org/roadmap/',
        points: 156,
        comments: 23,
        author: 'wasmteam',
        source: 'hackernews'
      }
    })
  ]);

  console.log('✅ Created news items');

  // Create some likes and follows
  await Promise.all([
    // User 1 likes projects
    prisma.like.create({
      data: { userId: users[1].id, projectId: projects[0].id }
    }),
    prisma.like.create({
      data: { userId: users[1].id, blogPostId: blogPosts[2].id }
    }),
    
    // User 2 likes content
    prisma.like.create({
      data: { userId: users[2].id, projectId: projects[0].id }
    }),
    prisma.like.create({
      data: { userId: users[2].id, blogPostId: blogPosts[0].id }
    }),

    // Follow relationships
    prisma.follow.create({
      data: { followerId: users[1].id, followingId: users[0].id }
    }),
    prisma.follow.create({
      data: { followerId: users[2].id, followingId: users[0].id }
    }),
    prisma.follow.create({
      data: { followerId: users[0].id, followingId: users[2].id }
    })
  ]);

  console.log('✅ Created likes and follows');

  // Create sample comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'This is incredible! The real-time visualization is so smooth. How did you handle the WebGL performance optimization?',
        authorId: users[1].id,
        projectId: projects[0].id
      }
    }),
    prisma.comment.create({
      data: {
        content: 'Great article! The section on meaningful names really resonated with me. I\'ve been trying to improve my naming conventions.',
        authorId: users[0].id,
        blogPostId: blogPosts[0].id
      }
    }),
    prisma.comment.create({
      data: {
        content: 'Fascinating approach to state management. Have you considered how this might work with concurrent rendering in React 18?',
        authorId: users[3].id,
        projectId: projects[1].id
      }
    })
  ]);

  console.log('✅ Created comments');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });