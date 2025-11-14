"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useApi } from "@/hooks/use-api";
import { api, Project } from "@/lib/api";
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
  Play,
  Heart
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data for trending languages and categories (to be replaced with real API calls)
const mockTrendingLanguages = [
  { name: "TypeScript", count: 1247, trend: "up" },
  { name: "Rust", count: 892, trend: "up" },
  { name: "Python", count: 756, trend: "stable" },
  { name: "JavaScript", count: 634, trend: "down" },
  { name: "Go", count: 523, trend: "up" },
  { name: "WebAssembly", count: 445, trend: "up" }
];

const mockProjectCategories = [
  { name: "AI & ML", count: 234 },
  { name: "Web Development", count: 567 },
  { name: "Developer Tools", count: 345 },
  { name: "Design Systems", count: 123 },
  { name: "Performance", count: 189 },
  { name: "Experimental", count: 67 }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<'trending' | 'recent' | 'stars' | 'popular'>('trending');
  
  const { data: projectsData, loading, error } = useApi(
    () => api.getProjects({ 
      limit: 12, 
      search: searchQuery, 
      tag: selectedCategory || undefined,
      sort: sortType
    }),
    [searchQuery, selectedCategory, sortType]
  );

  const projects = projectsData?.projects || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleLikeProject = async (projectId: string) => {
    try {
      await api.likeProject(projectId);
      // We would refetch or update the local state here, but for now just refetch
      // In a real app, you might optimistically update the UI
    } catch (err) {
      console.error("Failed to like project:", err);
    }
  };

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
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-6 mb-8">
                  <Button 
                    variant={sortType === 'trending' ? 'secondary' : 'ghost'} 
                    className={`font-light ${sortType === 'trending' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setSortType('trending')}
                  >
                    Trending
                  </Button>
                  <Button 
                    variant={sortType === 'popular' ? 'secondary' : 'ghost'} 
                    className={`font-light ${sortType === 'popular' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setSortType('popular')}
                  >
                    Popular
                  </Button>
                  <Button 
                    variant={sortType === 'recent' ? 'secondary' : 'ghost'} 
                    className={`font-light ${sortType === 'recent' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setSortType('recent')}
                  >
                    Recent
                  </Button>
                  <Button 
                    variant={sortType === 'stars' ? 'secondary' : 'ghost'} 
                    className={`font-light ${sortType === 'stars' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setSortType('stars')}
                  >
                    Most Stars
                  </Button>
                </div>

                {/* Filter Tags */}
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.15em]">
                    Categories:
                  </span>
                  <div className="flex items-center space-x-2">
                    {mockProjectCategories.slice(0, 4).map((category) => (
                      <Badge 
                        key={category.name} 
                        variant="outline" 
                        className={`font-light border-border/30 text-xs cursor-pointer hover:bg-muted/50 ${
                          selectedCategory === category.name ? 'border-primary/40 text-primary bg-primary/10' : ''
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="space-y-8">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="border-primary/20 bg-card/30">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                          </div>
                        </div>
                        <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-3" />
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-muted rounded animate-pulse" />
                          <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Failed to load projects: {error}</p>
                  </div>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <Card key={project.id} className="border-primary/20 bg-card/20 hover-lift">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={project.author.image || "/api/placeholder/40/40"} />
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
                            {project.demoUrl && (
                              <Button variant="outline" size="sm" className="font-light">
                                <Play className="mr-2 h-3 w-3" />
                                Demo
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="ghost" size="sm">
                                <Github className="h-4 w-4" />
                              </Button>
                            )}
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
                              <span>{project.stars.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="h-3 w-3" />
                              <span>{project.forks}</span>
                            </div>
                            <Badge variant="outline" className="font-light border-border/30 text-xs">
                              {project.language || 'N/A'}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="font-light" 
                              onClick={() => handleLikeProject(project.id)}
                            >
                              <Heart className="mr-2 h-3 w-3" />
                              {project._count?.likes || 0}
                            </Button>
                            <Button variant="ghost" size="sm" className="font-light">
                              <MessageCircle className="mr-2 h-3 w-3" />
                              {project._count?.comments || 0}
                            </Button>
                            <Button variant="ghost" size="sm" className="font-light">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found. Try adjusting your search or filters.</p>
                  </div>
                )}
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
                    {mockTrendingLanguages.map((lang, index) => (
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
                    {mockProjectCategories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <p 
                          className={`text-sm font-light cursor-pointer hover:text-primary transition-colors ${
                            selectedCategory === category.name ? 'text-primary' : ''
                          }`}
                          onClick={() => handleCategoryClick(category.name)}
                        >
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

              {/* Following Section */}
              <Card className="border-primary/20 bg-card/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-light">From Your Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-light text-muted-foreground mb-4">
                    Projects from users you follow
                  </p>
                  <Button variant="outline" className="w-full font-light" asChild>
                    <Link href="/projects?following=true">
                      View Projects
                    </Link>
                  </Button>
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