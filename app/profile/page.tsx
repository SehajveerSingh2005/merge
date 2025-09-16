import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  Github,
  Settings
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
  name: "John Developer",
  username: "johndev",
  bio: "Full-stack developer passionate about React, TypeScript, and building great user experiences. Open source contributor and tech blogger.",
  location: "San Francisco, CA",
  website: "https://johndev.com",
  joinedDate: "March 2023",
  avatar: "/api/placeholder/120/120",
  followers: 1247,
  following: 892,
  githubStats: {
    publicRepos: 42,
    contributions: 1337,
    stars: 2156
  }
};

const mockProjects = [
  {
    id: 1,
    name: "react-dashboard",
    description: "A modern dashboard built with React and TypeScript",
    stars: 234,
    forks: 45,
    language: "TypeScript",
    updatedAt: "2 days ago"
  },
  {
    id: 2,
    name: "api-toolkit",
    description: "Utility library for building REST APIs with Node.js",
    stars: 156,
    forks: 23,
    language: "JavaScript",
    updatedAt: "1 week ago"
  },
  {
    id: 3,
    name: "css-animations",
    description: "Collection of smooth CSS animations and transitions",
    stars: 89,
    forks: 12,
    language: "CSS",
    updatedAt: "2 weeks ago"
  }
];

const mockBlogs = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for structuring large React applications...",
    publishedAt: "3 days ago",
    readTime: "8 min read",
    likes: 124
  },
  {
    id: 2,
    title: "TypeScript Tips for Better Code",
    excerpt: "Advanced TypeScript techniques that will improve your development workflow...",
    publishedAt: "1 week ago",
    readTime: "6 min read",
    likes: 89
  }
];

export default function ProfilePage() {
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
            <Link href="/blogs" className="text-muted-foreground hover:text-foreground">Blogs</Link>
            <Link href="/notifications" className="text-muted-foreground hover:text-foreground">Notifications</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                      <p className="text-muted-foreground">@{mockUser.username}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <Button>Follow</Button>
                      <Button variant="outline">Message</Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{mockUser.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mockUser.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={mockUser.website} className="text-primary hover:underline">
                        {mockUser.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {mockUser.joinedDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 mt-4">
                    <div>
                      <span className="font-semibold">{mockUser.followers}</span>
                      <span className="text-muted-foreground ml-1">followers</span>
                    </div>
                    <div>
                      <span className="font-semibold">{mockUser.following}</span>
                      <span className="text-muted-foreground ml-1">following</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{mockUser.githubStats.publicRepos}</div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{mockUser.githubStats.contributions}</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{mockUser.githubStats.stars}</div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Code2 className="h-5 w-5" />
                      <span>{project.name}</span>
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
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
                    <span className="text-sm text-muted-foreground">Updated {project.updatedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="blogs" className="space-y-4">
            {mockBlogs.map((blog) => (
              <Card key={blog.id}>
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>{blog.publishedAt}</span>
                      <span>{blog.readTime}</span>
                      <span>{blog.likes} likes</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Activity feed coming soon...
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}