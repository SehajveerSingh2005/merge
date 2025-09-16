import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Heart,
  MessageCircle,
  Share,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";
import Link from "next/link";

// Mock blog posts data
const mockBlogs = [
  {
    id: 1,
    title: "Building Scalable React Applications: A Complete Guide",
    excerpt: "Learn how to structure and build React applications that can scale from prototype to production. We'll cover component architecture, state management, and performance optimization techniques.",
    content: "Full content here...",
    author: {
      name: "Sarah Chen",
      username: "sarahdev",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "2 days ago",
    readTime: "8 min read",
    likes: 234,
    comments: 45,
    tags: ["react", "javascript", "architecture", "scalability"],
    featured: true
  },
  {
    id: 2,
    title: "TypeScript Tips for Better Code Quality",
    excerpt: "Advanced TypeScript techniques that will improve your development workflow and help you write more maintainable code. From utility types to advanced patterns.",
    content: "Full content here...",
    author: {
      name: "Alex Rodriguez",
      username: "alexdev",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "4 days ago",
    readTime: "6 min read",
    likes: 189,
    comments: 32,
    tags: ["typescript", "javascript", "best-practices", "development"],
    featured: false
  },
  {
    id: 3,
    title: "The Future of Web Development: What's Coming in 2025",
    excerpt: "Exploring the latest trends and technologies that will shape web development in 2025. From new frameworks to emerging standards and tools.",
    content: "Full content here...",
    author: {
      name: "Emma Davis",
      username: "emmad",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "1 week ago",
    readTime: "10 min read",
    likes: 156,
    comments: 28,
    tags: ["webdev", "trends", "future", "technology"],
    featured: true
  },
  {
    id: 4,
    title: "Getting Started with Machine Learning in Python",
    excerpt: "A beginner-friendly introduction to machine learning using Python. We'll cover the basics of scikit-learn, data preprocessing, and building your first model.",
    content: "Full content here...",
    author: {
      name: "David Kim",
      username: "davidk",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "5 days ago",
    readTime: "12 min read",
    likes: 145,
    comments: 23,
    tags: ["python", "machine-learning", "ai", "beginners"],
    featured: false
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method for optimal results in your web projects.",
    content: "Full content here...",
    author: {
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "3 days ago",
    readTime: "7 min read",
    likes: 123,
    comments: 19,
    tags: ["css", "layout", "grid", "flexbox"],
    featured: false
  },
  {
    id: 6,
    title: "Building High-Performance APIs with Node.js",
    excerpt: "Learn how to build fast, scalable APIs using Node.js. We'll cover performance optimization, caching strategies, and best practices for production.",
    content: "Full content here...",
    author: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/api/placeholder/40/40"
    },
    publishedAt: "6 days ago",
    readTime: "9 min read",
    likes: 98,
    comments: 15,
    tags: ["nodejs", "api", "performance", "backend"],
    featured: false
  }
];

const featuredBlogs = mockBlogs.filter(b => b.featured);
const allBlogs = mockBlogs;

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Merge</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
            <Link href="/blogs" className="text-primary font-medium">Blogs</Link>
            <Link href="/notifications" className="text-muted-foreground hover:text-foreground">Notifications</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Write Blog
            </Button>
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Developer Blogs</h1>
          <p className="text-muted-foreground">
            Read the latest insights and tutorials from the developer community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search blog posts..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Featured Blogs */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Posts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">Featured</Badge>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="hover:text-primary cursor-pointer">
                    {blog.title}
                  </CardTitle>
                  <CardDescription>{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={blog.author.avatar} />
                        <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{blog.author.name}</p>
                        <p className="text-xs text-muted-foreground">@{blog.author.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{blog.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="mr-2 h-4 w-4" />
                        {blog.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {blog.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    <Button size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Blog Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid gap-6">
            {allBlogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                          {blog.title}
                        </h3>
                        {blog.featured && <Badge variant="secondary">Featured</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                      
                      <div className="flex items-center space-x-6 mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={blog.author.avatar} />
                            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{blog.author.name}</p>
                            <p className="text-xs text-muted-foreground">@{blog.author.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{blog.publishedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-2 h-4 w-4" />
                          {blog.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {blog.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button>Read More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}