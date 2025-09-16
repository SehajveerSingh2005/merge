import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Star,
  GitFork,
  ExternalLink,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Calendar
} from "lucide-react";
import Link from "next/link";

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: "react-dashboard",
    description: "A modern, responsive dashboard built with React, TypeScript, and Tailwind CSS. Features real-time data visualization and dark mode support.",
    author: {
      name: "Sarah Chen",
      username: "sarahdev",
      avatar: "/api/placeholder/40/40"
    },
    stars: 1247,
    forks: 189,
    language: "TypeScript",
    tags: ["react", "typescript", "dashboard", "tailwind"],
    updatedAt: "2 days ago",
    featured: true
  },
  {
    id: 2,
    name: "api-toolkit",
    description: "Comprehensive utility library for building REST APIs with Node.js. Includes authentication, validation, and error handling.",
    author: {
      name: "Alex Rodriguez",
      username: "alexdev",
      avatar: "/api/placeholder/40/40"
    },
    stars: 892,
    forks: 156,
    language: "JavaScript",
    tags: ["nodejs", "api", "backend", "express"],
    updatedAt: "5 days ago",
    featured: false
  },
  {
    id: 3,
    name: "css-animations",
    description: "Beautiful collection of smooth CSS animations and transitions. Perfect for modern web applications.",
    author: {
      name: "Emma Davis",
      username: "emmad",
      avatar: "/api/placeholder/40/40"
    },
    stars: 634,
    forks: 89,
    language: "CSS",
    tags: ["css", "animations", "frontend", "ui"],
    updatedAt: "1 week ago",
    featured: true
  },
  {
    id: 4,
    name: "ml-playground",
    description: "Interactive machine learning playground with Jupyter notebooks and Python examples for beginners.",
    author: {
      name: "David Kim",
      username: "davidk",
      avatar: "/api/placeholder/40/40"
    },
    stars: 445,
    forks: 67,
    language: "Python",
    tags: ["python", "machine-learning", "jupyter", "ai"],
    updatedAt: "3 days ago",
    featured: false
  },
  {
    id: 5,
    name: "vue-components",
    description: "Reusable Vue.js components library with comprehensive documentation and TypeScript support.",
    author: {
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "/api/placeholder/40/40"
    },
    stars: 378,
    forks: 45,
    language: "Vue",
    tags: ["vue", "components", "typescript", "ui-library"],
    updatedAt: "4 days ago",
    featured: false
  },
  {
    id: 6,
    name: "rust-cli-tools",
    description: "Collection of command-line tools built with Rust. Fast, reliable, and cross-platform utilities.",
    author: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/api/placeholder/40/40"
    },
    stars: 267,
    forks: 23,
    language: "Rust",
    tags: ["rust", "cli", "tools", "systems"],
    updatedAt: "6 days ago",
    featured: false
  }
];

const featuredProjects = mockProjects.filter(p => p.featured);
const allProjects = mockProjects;

export default function ProjectsPage() {
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
            <Link href="/projects" className="text-primary font-medium">Projects</Link>
            <Link href="/blogs" className="text-muted-foreground hover:text-foreground">Blogs</Link>
            <Link href="/notifications" className="text-muted-foreground hover:text-foreground">Notifications</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
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
          <h1 className="text-3xl font-bold mb-2">Discover Projects</h1>
          <p className="text-muted-foreground">
            Explore amazing projects built by the developer community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Featured Projects */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        <Code2 className="h-5 w-5" />
                        <span>{project.name}</span>
                        <Badge variant="secondary">Featured</Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.author.avatar} />
                        <AvatarFallback>{project.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.author.name}</p>
                        <p className="text-xs text-muted-foreground">@{project.author.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>{project.forks}</span>
                      </div>
                      <Badge variant="outline">{project.language}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Updated {project.updatedAt}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm">
                        <Star className="mr-2 h-4 w-4" />
                        Star
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Projects</h2>
          <div className="grid gap-4">
            {allProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                          {project.name}
                        </h3>
                        {project.featured && <Badge variant="secondary">Featured</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="flex items-center space-x-6 mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={project.author.avatar} />
                            <AvatarFallback className="text-xs">{project.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">@{project.author.username}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-4 w-4" />
                            <span>{project.forks}</span>
                          </div>
                          <Badge variant="outline">{project.language}</Badge>
                          <span>Updated {project.updatedAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm">
                        <Star className="mr-2 h-4 w-4" />
                        Star
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
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