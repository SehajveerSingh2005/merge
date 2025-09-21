import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { 
  Code2, 
  Star,
  GitFork,
  ExternalLink,
  Search,
  Filter,
  Plus,
  TrendingUp,
  MessageCircle,
  Github,
  Play
} from "lucide-react";
import Link from "next/link";

// Enhanced mock projects data
const mockProjects = [
  {
    id: 1,
    name: "neural-canvas",
    description: "Interactive neural network visualization tool built with Three.js and WebGL shaders. Real-time training visualization with customizable architectures and beautiful animations.",
    author: {
      name: "Sarah Chen",
      username: "neural_dev",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 2847, forks: 234, watchers: 156, issues: 12 },
    language: "TypeScript",
    tags: ["WebGL", "Three.js", "Neural Networks", "Visualization"],
    updatedAt: "6 hours ago",
    featured: true,
    demo: "https://neural-canvas.dev"
  },
  {
    id: 2,
    name: "quantum-state-manager",
    description: "State management library inspired by quantum mechanics principles. Superposition meets React in this experimental approach to application state.",
    author: {
      name: "Alex Rodriguez",
      username: "quantum_coder",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 1934, forks: 167, watchers: 89, issues: 8 },
    language: "JavaScript",
    tags: ["React", "State Management", "Quantum", "Experimental"],
    updatedAt: "1 day ago",
    featured: true,
    demo: "https://quantum-state.dev"
  },
  {
    id: 3,
    name: "design-system-kit",
    description: "Comprehensive design system with React components, design tokens, and documentation. Built for scale with TypeScript and Storybook integration.",
    author: {
      name: "Jordan Kim",
      username: "design_systems_guru",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 1567, forks: 123, watchers: 67, issues: 15 },
    language: "TypeScript",
    tags: ["Design System", "React", "Storybook", "Components"],
    updatedAt: "3 days ago",
    featured: false,
    demo: "https://design-kit.dev"
  },
  {
    id: 4,
    name: "poetic-code-generator",
    description: "AI-powered code generator that writes code like poetry. Where functionality meets beauty in perfect harmony. Experimental approach to expressive programming.",
    author: {
      name: "Maya Patel",
      username: "code_poet",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 1234, forks: 89, watchers: 45, issues: 6 },
    language: "Python",
    tags: ["AI", "Code Generation", "Poetry", "Experimental"],
    updatedAt: "5 days ago",
    featured: false,
    demo: "https://poetic-code.dev"
  },
  {
    id: 5,
    name: "rust-cli-toolkit",
    description: "Collection of high-performance command-line tools built with Rust. Fast, reliable, and cross-platform utilities for modern development workflows.",
    author: {
      name: "River Chen",
      username: "rust_evangelist",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 987, forks: 67, watchers: 34, issues: 4 },
    language: "Rust",
    tags: ["Rust", "CLI", "Tools", "Performance"],
    updatedAt: "1 week ago",
    featured: false,
    demo: null
  },
  {
    id: 6,
    name: "micro-animations-lib",
    description: "Lightweight animation library for micro-interactions. Smooth, performant animations that enhance user experience without bloating your bundle.",
    author: {
      name: "Casey Morgan",
      username: "animation_master",
      avatar: "/api/placeholder/40/40"
    },
    stats: { stars: 756, forks: 45, watchers: 23, issues: 2 },
    language: "JavaScript",
    tags: ["Animation", "Micro-interactions", "Performance", "UI"],
    updatedAt: "2 weeks ago",
    featured: false,
    demo: "https://micro-animations.dev"
  }
];

const trendingLanguages = [
  { name: "TypeScript", count: 1247, trend: "up" },
  { name: "Rust", count: 892, trend: "up" },
  { name: "Python", count: 756, trend: "stable" },
  { name: "JavaScript", count: 634, trend: "down" },
  { name: "Go", count: 523, trend: "up" },
  { name: "WebAssembly", count: 445, trend: "up" }
];

const projectCategories = [
  { name: "AI & ML", count: 234 },
  { name: "Web Development", count: 567 },
  { name: "Developer Tools", count: 345 },
  { name: "Design Systems", count: 123 },
  { name: "Performance", count: 189 },
  { name: "Experimental", count: 67 }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="projects" />

      <div className="pt-20 px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Page Header */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-4xl font-light mb-3 tracking-tight">Projects</h1>
                    <p className="text-base font-light text-muted-foreground">
                      Discover amazing projects from the developer community
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" className="font-light">
                      <Filter className="mr-2 h-3 w-3" />
                      Filter
                    </Button>
                    <Button size="sm" className="font-light bg-foreground text-background">
                      <Plus className="mr-2 h-3 w-3" />
                      Share Project
                    </Button>
                  </div>
                </div>
                
                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                  <Input 
                    placeholder="Search projects, languages, topics..." 
                    className="pl-12 bg-muted/30 border-primary/20 font-light focus:border-primary/40"
                  />
                </div>

                {/* Filter Tags */}
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.15em]">
                    Categories:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      AI & ML
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      Web Development
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      Developer Tools
                    </Badge>
                    <Badge variant="outline" className="font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50">
                      Experimental
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="space-y-8">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="border-primary/20 bg-card/20 hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={project.author.avatar} />
                            <AvatarFallback className="text-xs">{project.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-light">{project.author.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">@{project.author.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {project.featured && (
                            <Badge variant="outline" className="font-light border-primary/40 text-primary text-xs uppercase tracking-[0.1em]">
                              Featured
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground font-mono">{project.updatedAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-light mb-3 hover:text-primary cursor-pointer transition-colors flex items-center space-x-2">
                            <Code2 className="h-5 w-5" />
                            <span>{project.name}</span>
                          </CardTitle>
                          <CardDescription className="text-sm font-light text-muted-foreground story-text leading-relaxed">
                            {project.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          {project.demo && (
                            <Button variant="outline" size="sm" className="font-light">
                              <Play className="mr-2 h-3 w-3" />
                              Demo
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{project.stats.stars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-3 w-3" />
                            <span>{project.stats.forks}</span>
                          </div>
                          <Badge variant="outline" className="font-light border-border/30 text-xs">
                            {project.language}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="font-light">
                            <Star className="mr-2 h-3 w-3" />
                            Star
                          </Button>
                          <Button variant="ghost" size="sm" className="font-light">
                            <GitFork className="mr-2 h-3 w-3" />
                            Fork
                          </Button>
                          <Button variant="ghost" size="sm" className="font-light">
                            <MessageCircle className="mr-2 h-3 w-3" />
                            Discuss
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="font-light">
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
              {/* Trending Languages */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Trending Languages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingLanguages.map((lang, index) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono text-muted-foreground w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p className="text-sm font-light">{lang.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {lang.count.toLocaleString()} projects
                            </p>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          lang.trend === 'up' ? 'text-green-500 bg-green-500/10' :
                          lang.trend === 'down' ? 'text-red-500 bg-red-500/10' :
                          'text-muted-foreground bg-muted/20'
                        }`}>
                          {lang.trend === 'up' ? '↗' : lang.trend === 'down' ? '↘' : '→'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Categories */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectCategories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <p className="text-sm font-light cursor-pointer hover:text-primary transition-colors">
                          {category.name}
                        </p>
                        <span className="text-xs text-muted-foreground font-mono">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Share Your Project */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">Share Your Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground mb-4">
                    Built something amazing? Share it with the community.
                  </p>
                  <Button className="w-full font-light bg-foreground text-background" asChild>
                    <Link href="/projects/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Share Project
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