import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ExternalLink,
  TrendingUp,
  Search,
  Plus,
  Filter,
  Clock,
  Eye,
  Bookmark,
  X
} from "lucide-react";
import Link from "next/link";

// Enhanced mock data for insights
const mockInsights = [
  {
    id: 1,
    type: "article",
    source: "community",
    title: "The Philosophy of Clean Code: Why Readability Matters More Than Cleverness",
    excerpt: "Exploring the long-term impact of code readability on team productivity, maintainability, and developer happiness. A deep dive into the principles that make code truly elegant.",
    author: {
      name: "Sarah Chen",
      username: "code_philosopher",
      avatar: "/api/placeholder/40/40"
    },
    stats: { 
      likes: 342, 
      comments: 67, 
      views: 2847,
      readTime: "12 min read" 
    },
    tags: ["Clean Code", "Philosophy", "Best Practices", "Team Collaboration"],
    publishedAt: "6 hours ago",
    featured: true
  },
  {
    id: 2,
    type: "news",
    source: "hackernews",
    title: "Rust Foundation Announces Major Memory Safety Initiative for 2025",
    excerpt: "A comprehensive program to advance memory safety across the software industry, with partnerships from major tech companies and open source projects.",
    author: {
      name: "Hacker News",
      username: "hackernews",
      avatar: "/api/placeholder/40/40"
    },
    stats: { 
      points: 456, 
      comments: 123,
      views: 5234
    },
    tags: ["Rust", "Memory Safety", "Industry News", "Open Source"],
    publishedAt: "8 hours ago",
    featured: false
  },
  {
    id: 3,
    type: "tutorial",
    source: "community",
    title: "Building Performant WebGL Applications: From Basics to Advanced Optimization",
    excerpt: "A comprehensive guide to WebGL development, covering shader optimization, memory management, and rendering pipeline best practices for high-performance graphics.",
    author: {
      name: "Alex Rodriguez",
      username: "webgl_wizard",
      avatar: "/api/placeholder/40/40"
    },
    stats: { 
      likes: 234, 
      comments: 45, 
      views: 1876,
      readTime: "18 min read" 
    },
    tags: ["WebGL", "Performance", "Graphics", "Tutorial"],
    publishedAt: "1 day ago",
    featured: true
  },
  {
    id: 4,
    type: "opinion",
    source: "community",
    title: "Why Design Systems Are the Future of Scalable Development",
    excerpt: "Lessons learned from implementing design systems across multiple products and teams. The challenges, benefits, and best practices for systematic design.",
    author: {
      name: "Jordan Kim",
      username: "design_systems_guru",
      avatar: "/api/placeholder/40/40"
    },
    stats: { 
      likes: 189, 
      comments: 34, 
      views: 1432,
      readTime: "10 min read" 
    },
    tags: ["Design Systems", "Scale", "UI/UX", "Team Collaboration"],
    publishedAt: "2 days ago",
    featured: false
  },
  {
    id: 5,
    type: "news",
    source: "techcrunch",
    title: "AI Code Generation Tools Show 40% Productivity Increase in Developer Study",
    excerpt: "New research from Stanford reveals significant productivity gains when developers use AI-assisted coding tools, but raises questions about code quality and learning.",
    author: {
      name: "Tech News",
      username: "technews",
      avatar: "/api/placeholder/40/40"
    },
    stats: { 
      points: 298, 
      comments: 87,
      views: 3456
    },
    tags: ["AI", "Productivity", "Developer Tools", "Research"],
    publishedAt: "3 days ago",
    featured: false
  }
];

const trendingTopics = [
  { name: "AI Development", count: 1247, trend: "up" },
  { name: "Rust", count: 892, trend: "up" },
  { name: "WebGL", count: 756, trend: "stable" },
  { name: "Design Systems", count: 634, trend: "up" },
  { name: "Performance", count: 523, trend: "stable" },
  { name: "Clean Code", count: 445, trend: "down" }
];

const featuredAuthors = [
  {
    name: "Maya Patel",
    username: "maya_writes",
    bio: "Senior Engineer at Vercel, writing about web performance",
    followers: 3421,
    avatar: "/api/placeholder/40/40",
    verified: true
  },
  {
    name: "Casey Morgan",
    username: "systems_thinker",
    bio: "Design systems architect, previously at Figma",
    followers: 2876,
    avatar: "/api/placeholder/40/40",
    verified: true
  },
  {
    name: "River Chen",
    username: "rust_evangelist",
    bio: "Core contributor to Rust, systems programming enthusiast",
    followers: 4123,
    avatar: "/api/placeholder/40/40",
    verified: true
  }
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="insights" />

      <div className="pt-20 px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Page Header */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-4xl font-light mb-3 tracking-tight">Explore</h1>
                    <p className="text-base font-light text-muted-foreground">
                      Discover trending insights, news, and discussions
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" className="font-light">
                      <Filter className="mr-2 h-3 w-3" />
                      Filter
                    </Button>
                    <Button size="sm" className="font-light bg-foreground text-background">
                      <Plus className="mr-2 h-3 w-3" />
                      Write Insight
                    </Button>
                  </div>
                </div>
                
                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                  <Input 
                    placeholder="Search insights, topics, authors..." 
                    className="pl-12 bg-muted/30 border-primary/20 font-light focus:border-primary/40"
                  />
                </div>

                {/* Filter Tags */}
                {/* Trending Tabs */}
                <div className="flex items-center space-x-6 mb-8">
                  <Button variant="ghost" className="font-light text-foreground">
                    Trending
                  </Button>
                  <Button variant="ghost" className="font-light text-muted-foreground hover:text-foreground">
                    Latest
                  </Button>
                  <Button variant="ghost" className="font-light text-muted-foreground hover:text-foreground">
                    Top This Week
                  </Button>
                  <Button variant="ghost" className="font-light text-muted-foreground hover:text-foreground">
                    Rising
                  </Button>
                </div>

                {/* Filter Tags */}
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.15em]">
                    Topics:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-light border-primary/30 bg-primary/10 text-xs cursor-pointer">
                      All
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      AI Development
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      Performance
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      Design Systems
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      News
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Insights Feed */}
              <div className="space-y-8">
                {mockInsights.map((insight) => (
                  <Card key={insight.id} className="border-primary/20 bg-card/20 hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={insight.author.avatar} />
                            <AvatarFallback className="text-xs">{insight.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-light">{insight.author.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">@{insight.author.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {insight.featured && (
                            <Badge variant="outline" className="font-light border-primary/40 text-primary text-xs uppercase tracking-[0.1em]">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
                            {insight.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">{insight.publishedAt}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-light mb-3 hover:text-primary cursor-pointer transition-colors leading-tight">
                        {insight.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-light text-muted-foreground story-text leading-relaxed">
                        {insight.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          {insight.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {insight.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{insight.tags.length - 3}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          {insight.stats.readTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{insight.stats.readTime}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{insight.stats.views?.toLocaleString() || insight.stats.points}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="font-light">
                            <Heart className="mr-2 h-3 w-3" />
                            {insight.stats.likes || insight.stats.points}
                          </Button>
                          <Button variant="ghost" size="sm" className="font-light">
                            <MessageCircle className="mr-2 h-3 w-3" />
                            {insight.stats.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="font-light">
                            <Share className="mr-2 h-3 w-3" />
                            Share
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="font-light">
                            <Bookmark className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="font-light">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Trending Topics */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Trending Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={topic.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono text-muted-foreground w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p className="text-sm font-light">{topic.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {topic.count.toLocaleString()} insights
                            </p>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          topic.trend === 'up' ? 'text-green-500 bg-green-500/10' :
                          topic.trend === 'down' ? 'text-red-500 bg-red-500/10' :
                          'text-muted-foreground bg-muted/20'
                        }`}>
                          {topic.trend === 'up' ? '↗' : topic.trend === 'down' ? '↘' : '→'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Authors */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Featured Authors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {featuredAuthors.map((author) => (
                      <div key={author.username} className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={author.avatar} />
                          <AvatarFallback className="text-xs">{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-light truncate">{author.name}</p>
                              {author.verified && (
                                <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                  <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <Button size="sm" variant="outline" className="font-light text-xs px-3">
                              Follow
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono mb-1">@{author.username}</p>
                          <p className="text-xs text-muted-foreground mb-2">{author.bio}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {author.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Write Your Own */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Share Your Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground mb-4">
                    Have something valuable to share with the community?
                  </p>
                  <Button className="w-full font-light bg-foreground text-background" asChild>
                    <Link href="/insights/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Write an Insight
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}