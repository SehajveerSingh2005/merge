import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { 
  Code2, 
  Heart, 
  MessageCircle, 
  Share, 
  ExternalLink,
  Star,
  GitFork,
  TrendingUp,
  Search,
  Plus,
  Settings,
  X
} from "lucide-react";
import Link from "next/link";

// Enhanced mock data
const mockFeedItems = [
  {
    id: 1,
    type: "project",
    title: "Neural Network Visualizer",
    description: "Real-time visualization of neural network training processes built with Three.js and WebGL shaders.",
    author: {
      name: "Sarah Chen",
      username: "neural_dev",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 2147, forks: 234, likes: 89 },
    tags: ["TypeScript", "WebGL", "Three.js"],
    timeAgo: "3 hours ago",
    featured: true
  },
  {
    id: 2,
    type: "blog",
    title: "The Art of Writing Readable Code",
    description: "Exploring the philosophy behind clean code and how it impacts team productivity and maintainability.",
    author: {
      name: "Alex Rodriguez",
      username: "code_poet",
      avatar: "/api/placeholder/40/40"
    },
    stats: { likes: 156, comments: 23, readTime: "8 min" },
    tags: ["Clean Code", "Philosophy", "Best Practices"],
    timeAgo: "6 hours ago",
    featured: false
  },
  {
    id: 3,
    type: "news",
    title: "Rust Foundation Announces New Memory Safety Initiative",
    description: "A comprehensive program to advance memory safety across the software industry.",
    author: {
      name: "Tech News",
      username: "technews",
      avatar: "/api/placeholder/40/40"
    },
    stats: { points: 342, comments: 67 },
    tags: ["Rust", "Memory Safety", "Industry"],
    timeAgo: "12 hours ago",
    featured: false
  },
  {
    id: 4,
    type: "project",
    title: "Quantum State Manager",
    description: "State management library inspired by quantum mechanics principles. Superposition meets React.",
    author: {
      name: "Emma Davis",
      username: "quantum_coder",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 1834, forks: 156, likes: 234 },
    tags: ["React", "Quantum", "State Management"],
    timeAgo: "1 day ago",
    featured: false
  }
];

const trendingTags = [
  { name: "react", count: 1247 },
  { name: "typescript", count: 892 },
  { name: "ai", count: 756 },
  { name: "webgl", count: 423 },
  { name: "rust", count: 389 },
  { name: "nextjs", count: 334 }
];

const featuredDevelopers = [
  {
    name: "Maya Patel",
    username: "maya_builds",
    bio: "Building the future of web interfaces",
    followers: 2341,
    avatar: "/api/placeholder/40/40"
  },
  {
    name: "Jordan Kim",
    username: "j_algorithms",
    bio: "Algorithms & data structures enthusiast",
    followers: 1876,
    avatar: "/api/placeholder/40/40"
  },
  {
    name: "Casey Morgan",
    username: "design_dev",
    bio: "Where design meets development",
    followers: 1654,
    avatar: "/api/placeholder/40/40"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="home" />

      <div className="pt-20 px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Feed */}
            <div className="lg:col-span-8">
              {/* Simple Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                  <Input 
                    placeholder="Search your feed..." 
                    className="pl-12 bg-muted/30 border-primary/20 font-light focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Feed Items */}
              <div className="space-y-8">
                {mockFeedItems.map((item) => (
                  <Card key={item.id} className="border-primary/20 bg-card/30 hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.author.avatar} />
                            <AvatarFallback className="text-xs">{item.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-light">{item.author.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">@{item.author.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {item.featured && (
                            <Badge variant="outline" className="font-light border-primary/40 text-primary text-xs uppercase tracking-[0.1em]">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">{item.timeAgo}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-light mb-3 hover:text-primary cursor-pointer transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-light text-muted-foreground story-text leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          {item.type === 'project' && (
                            <>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3" />
                                <span>{item.stats.stars}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <GitFork className="h-3 w-3" />
                                <span>{item.stats.forks}</span>
                              </div>
                            </>
                          )}
                          {item.type === 'blog' && (
                            <>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{item.stats.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{item.stats.comments}</span>
                              </div>
                              <span>{item.stats.readTime}</span>
                            </>
                          )}
                          {item.type === 'news' && (
                            <>
                              <span>{item.stats.points} points</span>
                              <span>{item.stats.comments} comments</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="font-light btn-no-hover">
                          <Heart className="mr-2 h-3 w-3" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="font-light btn-no-hover">
                          <MessageCircle className="mr-2 h-3 w-3" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm" className="font-light btn-no-hover">
                          <Share className="mr-2 h-3 w-3" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="font-light btn-no-hover ml-auto">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Trending Tags */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Trending</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTags.map((tag, index) => (
                      <div key={tag.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono text-muted-foreground w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <Badge variant="outline" className="font-light border-border/30 text-xs">
                            #{tag.name}
                          </Badge>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {tag.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Developers */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Featured Developers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {featuredDevelopers.map((dev) => (
                      <div key={dev.username} className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={dev.avatar} />
                          <AvatarFallback className="text-xs">{dev.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-light truncate">{dev.name}</p>
                            <Button size="sm" variant="outline" className="font-light text-xs px-3">
                              Follow
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">@{dev.username}</p>
                          <p className="text-xs text-muted-foreground mb-2">{dev.bio}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {dev.followers} followers
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start font-light" asChild>
                      <Link href="/projects/new">
                        <Plus className="mr-3 h-4 w-4" />
                        Share a Project
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start font-light" asChild>
                      <Link href="/insights/new">
                        <Plus className="mr-3 h-4 w-4" />
                        Write an Insight
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start font-light" asChild>
                      <Link href="/profile">
                        <Settings className="mr-3 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}