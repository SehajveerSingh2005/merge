import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Heart, 
  MessageCircle, 
  Share, 
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// Mock data for the MVP
const mockNewsItems = [
  {
    id: 1,
    title: "React 19 Released with New Features",
    url: "https://example.com",
    points: 342,
    comments: 89,
    author: "reactteam",
    timeAgo: "2 hours ago",
    thumbnail: "/api/placeholder/400/200"
  },
  {
    id: 2,
    title: "The Future of JavaScript: What's Coming in 2025",
    url: "https://example.com",
    points: 256,
    comments: 67,
    author: "jsdev",
    timeAgo: "4 hours ago",
    thumbnail: "/api/placeholder/400/200"
  }
];

const mockBlogPost = {
  id: 1,
  title: "Building Scalable React Applications: A Complete Guide",
  excerpt: "Learn how to structure and build React applications that can scale from prototype to production...",
  author: {
    name: "Sarah Chen",
    username: "sarahdev",
    avatar: "/api/placeholder/40/40"
  },
  publishedAt: "2 days ago",
  readTime: "8 min read",
  likes: 124,
  comments: 23
};

const mockProject = {
  id: 1,
  name: "awesome-dev-tools",
  description: "A curated list of awesome development tools and resources for modern web development",
  author: {
    name: "Alex Rodriguez",
    username: "alexdev",
    avatar: "/api/placeholder/40/40"
  },
  stars: 1247,
  forks: 89,
  language: "TypeScript",
  updatedAt: "1 day ago"
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Merge</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-primary font-medium">Home</Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
            <Link href="/blogs" className="text-muted-foreground hover:text-foreground">Blogs</Link>
            <Link href="/notifications" className="text-muted-foreground hover:text-foreground">Notifications</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Project */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Featured Project</Badge>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5" />
                  <span>{mockProject.name}</span>
                </CardTitle>
                <CardDescription>{mockProject.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockProject.author.avatar} />
                      <AvatarFallback>{mockProject.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{mockProject.author.name}</p>
                      <p className="text-xs text-muted-foreground">@{mockProject.author.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{mockProject.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{mockProject.forks}</span>
                    </div>
                    <Badge variant="outline">{mockProject.language}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Button size="sm">
                    <Star className="mr-2 h-4 w-4" />
                    Star
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Blog Post */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Featured Blog</Badge>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle>{mockBlogPost.title}</CardTitle>
                <CardDescription>{mockBlogPost.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockBlogPost.author.avatar} />
                      <AvatarFallback>{mockBlogPost.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{mockBlogPost.author.name}</p>
                      <p className="text-xs text-muted-foreground">@{mockBlogPost.author.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{mockBlogPost.publishedAt}</span>
                    <span>{mockBlogPost.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    {mockBlogPost.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {mockBlogPost.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tech News Feed */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Badge variant="secondary">Latest Tech News</Badge>
              </h2>
              {mockNewsItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <h3 className="font-medium hover:text-primary cursor-pointer">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{item.points} points</span>
                          <span>by {item.author}</span>
                          <span>{item.timeAgo}</span>
                          <span>{item.comments} comments</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">#react</Badge>
                  <Badge variant="secondary">#typescript</Badge>
                  <Badge variant="secondary">#nextjs</Badge>
                  <Badge variant="secondary">#ai</Badge>
                  <Badge variant="secondary">#webdev</Badge>
                  <Badge variant="secondary">#javascript</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Featured Developers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Developers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/api/placeholder/40/40`} />
                      <AvatarFallback>D{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Developer {i}</p>
                      <p className="text-xs text-muted-foreground">@dev{i}</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}