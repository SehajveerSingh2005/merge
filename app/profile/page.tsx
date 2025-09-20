import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import { 
  Code2, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  Github,
  Settings,
  MessageCircle,
  Heart,
  Plus
} from "lucide-react";
import Link from "next/link";

// Enhanced mock user data
const mockUser = {
  name: "Jordan Chen",
  username: "jordan_builds",
  bio: "Full-stack developer passionate about creating beautiful, functional experiences. Obsessed with clean code and thoughtful design.",
  location: "San Francisco, CA",
  website: "https://jordanchen.dev",
  joinedDate: "March 2023",
  avatar: "/api/placeholder/120/120",
  followers: 2847,
  following: 1234,
  githubStats: {
    publicRepos: 47,
    contributions: 2156,
    stars: 3892
  },
  skills: ["React", "TypeScript", "Node.js", "Python", "Design Systems", "WebGL"]
};

const mockProjects = [
  {
    id: 1,
    name: "neural-canvas",
    description: "Interactive neural network visualization tool built with Three.js and WebGL shaders. Real-time training visualization.",
    stars: 2341,
    forks: 234,
    language: "TypeScript",
    updatedAt: "2 days ago",
    featured: true,
    tags: ["WebGL", "Three.js", "Neural Networks"]
  },
  {
    id: 2,
    name: "design-system-kit",
    description: "Comprehensive design system with React components, tokens, and documentation. Built for scale.",
    stars: 1876,
    forks: 156,
    language: "TypeScript",
    updatedAt: "1 week ago",
    featured: true,
    tags: ["React", "Design System", "Storybook"]
  },
  {
    id: 3,
    name: "api-orchestrator",
    description: "Lightweight API orchestration layer with caching, rate limiting, and real-time monitoring.",
    stars: 892,
    forks: 89,
    language: "Node.js",
    updatedAt: "3 days ago",
    featured: false,
    tags: ["Node.js", "API", "Microservices"]
  }
];

const mockBlogs = [
  {
    id: 1,
    title: "The Philosophy of Clean Code",
    excerpt: "Exploring why readable code matters more than clever code, and how it impacts team productivity and maintainability.",
    publishedAt: "5 days ago",
    readTime: "12 min read",
    likes: 234,
    comments: 45,
    tags: ["Clean Code", "Philosophy", "Best Practices"]
  },
  {
    id: 2,
    title: "Building Performant WebGL Applications",
    excerpt: "Deep dive into WebGL optimization techniques, from shader compilation to memory management and rendering pipelines.",
    publishedAt: "2 weeks ago",
    readTime: "18 min read",
    likes: 189,
    comments: 32,
    tags: ["WebGL", "Performance", "Graphics"]
  },
  {
    id: 3,
    title: "Design Systems at Scale",
    excerpt: "Lessons learned from building and maintaining design systems across multiple products and teams.",
    publishedAt: "1 month ago",
    readTime: "15 min read",
    likes: 156,
    comments: 28,
    tags: ["Design Systems", "Scale", "Team Collaboration"]
  }
];

const mockActivity = [
  {
    id: 1,
    type: "star",
    action: "starred",
    target: "react-three-fiber",
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    type: "commit",
    action: "pushed to",
    target: "neural-canvas",
    timeAgo: "6 hours ago"
  },
  {
    id: 3,
    type: "follow",
    action: "started following",
    target: "@design_systems_guru",
    timeAgo: "1 day ago"
  }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="profile" />

      <div className="pt-20 px-8">
        <div className="max-w-8xl mx-auto">
          {/* Profile Header */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-start space-x-8">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback className="text-4xl font-light">{mockUser.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h1 className="text-4xl font-light mb-2 tracking-tight">{mockUser.name}</h1>
                        <p className="text-lg text-muted-foreground font-mono">@{mockUser.username}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" className="font-light">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button className="font-light bg-foreground text-background">
                          <Plus className="mr-2 h-4 w-4" />
                          Follow
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-base font-light text-muted-foreground story-text mb-6 max-w-2xl">
                      {mockUser.bio}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-light">{mockUser.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <LinkIcon className="h-4 w-4" />
                        <a href={mockUser.website} className="font-light hover:text-foreground transition-colors">
                          {mockUser.website}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-light">Joined {mockUser.joinedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-light">{mockUser.followers.toLocaleString()}</div>
                        <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light">{mockUser.following.toLocaleString()}</div>
                        <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">Following</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4">
                {/* Skills */}
                <Card className="border-border/20 bg-card/20 mb-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-light">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="font-light border-border/30 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* GitHub Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-border/20 bg-card/20 text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-light text-primary mb-1">{mockUser.githubStats.publicRepos}</div>
                      <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">Repos</div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/20 bg-card/20 text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-light text-primary mb-1">{mockUser.githubStats.contributions.toLocaleString()}</div>
                      <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">Commits</div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/20 bg-card/20 text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-light text-primary mb-1">{mockUser.githubStats.stars.toLocaleString()}</div>
                      <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">Stars</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList className="bg-muted/30 border border-border/20">
              <TabsTrigger value="projects" className="font-light">Projects</TabsTrigger>
              <TabsTrigger value="insights" className="font-light">Insights</TabsTrigger>
              <TabsTrigger value="activity" className="font-light">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light">Projects</h2>
                <Button variant="outline" className="font-light">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {mockProjects.map((project) => (
                  <Card key={project.id} className={`border-border/20 bg-card/20 hover-lift ${project.featured ? 'border-primary/20' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Code2 className="h-4 w-4" />
                          <CardTitle className="text-lg font-light">{project.name}</CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          {project.featured && (
                            <Badge variant="outline" className="font-light border-primary/30 text-xs uppercase tracking-[0.1em]">
                              Featured
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription className="text-sm font-light text-muted-foreground story-text">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{project.stars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-3 w-3" />
                            <span>{project.forks}</span>
                          </div>
                          <Badge variant="outline" className="font-light border-border/30 text-xs">
                            {project.language}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          Updated {project.updatedAt}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light">Insights</h2>
                <Button variant="outline" className="font-light">
                  <Plus className="mr-2 h-4 w-4" />
                  Write New
                </Button>
              </div>
              
              <div className="space-y-6">
                {mockBlogs.map((blog) => (
                  <Card key={blog.id} className="border-border/20 bg-card/20 hover-lift">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-light mb-3 hover:text-primary cursor-pointer transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-light text-muted-foreground story-text">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          <span>{blog.publishedAt}</span>
                          <span>{blog.readTime}</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{blog.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{blog.comments}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="mb-8">
                <h2 className="text-2xl font-light">Recent Activity</h2>
              </div>
              
              <Card className="border-border/20 bg-card/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {mockActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-light">
                            <span className="text-foreground">{activity.action}</span>
                            <span className="text-primary font-mono mx-2">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">{activity.timeAgo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}