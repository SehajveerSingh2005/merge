"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Plus,
  LogOut,
  Users,
  UserPlus,
  UserMinus,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

// Define types for the data we'll be fetching
interface Project {
  id: string;
  name: string;
  description: string;
  stars?: number;
  forks?: number;
  language?: string;
  updatedAt?: string;
  featured?: boolean;
  tags?: string[];
}

interface Insight {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  content?: string;
  author?: any;
  _count?: {
    likes: number;
    comments: number;
  };
  isLiked?: boolean;
}

interface Activity {
  id: string;
  type: string;
  action: string;
  target: string;
  timeAgo: string;
}

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [githubStats, setGithubStats] = useState({
    publicRepos: 0,
    publicGists: 0,
    followers: 0,
    following: 0,
    contributions: 0,
    stars: 0,
    totalForks: 0,
  });
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [githubStatsLoading, setGithubStatsLoading] = useState(true);

  const handleLogout = () => {
    logout();
    router.push("/auth/signin"); // Redirect to signin page after logout
  };

  // Fetch user projects, insights, and activity
  useEffect(() => {
    const fetchUserData = async () => {
      if (!loading && user) {
        try {
          // Fetch user projects
          setProjectsLoading(true);
          const projectsResponse = await api.getProjects({ limit: 10 });
          setProjects(projectsResponse.projects || []);

          // Fetch user insights/blogs
          setInsightsLoading(true);
          const insightsResponse = await api.getBlogPosts({ limit: 10 });
          // Transform BlogPost to Insight
          const transformedInsights = (insightsResponse.posts || []).map(
            (post) => ({
              id: post.id,
              title: post.title,
              excerpt: post.excerpt || post.content.substring(0, 100) + "...",
              publishedAt: post.createdAt,
              readTime: post.readTime ? `${post.readTime} min read` : "N/A",
              likes: post._count?.likes || 0,
              comments: post._count?.comments || 0,
              tags: post.tags || [],
              content: post.content,
              author: post.author,
              _count: post._count,
              isLiked: post.isLiked,
            }),
          );
          setInsights(transformedInsights);

          // Fetch user activity
          setActivityLoading(true);
          const activityResponse = await api.getNotifications({ limit: 10 });
          // Transform notifications to activity format
          const activityData = (activityResponse.notifications || []).map(
            (notification) => ({
              id: notification.id,
              type: notification.type || "notification",
              action: notification.message || notification.title || "Activity",
              target: notification.target || notification.id || "N/A",
              timeAgo:
                notification.timeAgo || notification.createdAt || "Just now",
            }),
          );
          setActivity(activityData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setProjects([]);
          setInsights([]);
          setActivity([]);
        } finally {
          setProjectsLoading(false);
          setInsightsLoading(false);
          setActivityLoading(false);
        }
      }
    };

    fetchUserData();

    // Fetch GitHub stats if user has githubUsername
    if (!loading && user && user.githubUsername) {
      const fetchGithubStats = async () => {
        try {
          setGithubStatsLoading(true);
          const stats = await api.getGitHubStats(user.githubUsername!);
          setGithubStats(stats);
        } catch (error) {
          console.error("Error fetching GitHub stats:", error);
          setGithubStats({
            publicRepos: 0,
            publicGists: 0,
            followers: 0,
            following: 0,
            contributions: 0,
            stars: 0,
            totalForks: 0,
          });
        } finally {
          setGithubStatsLoading(false);
        }
      };

      fetchGithubStats();
    } else {
      setGithubStatsLoading(false);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar currentPage="profile" />
        <div className="pt-20 px-8">
          <div className="max-w-8xl mx-auto flex items-center justify-center h-[calc(100vh-5rem)]">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Default values for when user data is not available
  const profileData = {
    name: user?.name || "User",
    username: user?.username || "username",
    bio: user?.bio || "No bio available",
    location: user?.location || "",
    website: user?.website || "",
    avatar: user?.image || "/api/placeholder/120/120",
    githubStats: {
      publicRepos: githubStats.publicRepos,
      publicGists: githubStats.publicGists,
      followers: githubStats.followers,
      following: githubStats.following,
      contributions: githubStats.contributions,
      stars: githubStats.stars,
      totalForks: githubStats.totalForks,
    },
    skills: [], // This would come from user profile or be added as a feature
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Unknown";

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="profile" />

      <div className="pt-20 px-8">
        <div className="max-w-8xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-3">
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-4xl font-light">
                      {profileData.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <h1 className="text-2xl font-light mt-4 tracking-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-muted-foreground font-mono">
                    @{profileData.username}
                  </p>

                  <div className="mt-6 flex flex-col space-y-3">
                    <Button variant="outline" className="font-light w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button className="font-light bg-foreground text-background w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Follow
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="flex-1"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <Card className="border-border/20 bg-card/20">
                  <CardContent className="p-6">
                    <p className="text-base font-light text-muted-foreground story-text mb-6">
                      {profileData.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                      {profileData.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-light">
                            {profileData.location}
                          </span>
                        </div>
                      )}
                      {profileData.website && (
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="h-4 w-4" />
                          <a
                            href={profileData.website}
                            className="font-light hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profileData.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-light">Joined {joinedDate}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    {profileData.skills.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-light text-muted-foreground mb-2 uppercase tracking-[0.05em]">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="font-light border-border/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                {/* GitHub Stats - Better organized */}
                <Card className="border-border/20 bg-card/20 mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-light flex items-center space-x-2">
                      <Github className="h-4 w-4 text-primary" />
                      <span>GitHub Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.publicRepos || 0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Repos
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.contributions?.toLocaleString() ||
                            0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Contributions
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.stars?.toLocaleString() || 0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Stars
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.totalForks?.toLocaleString() ||
                            0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Forks
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Merge Social Stats */}
                <Card className="border-border/20 bg-card/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-light flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Social Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.followers?.toLocaleString() ||
                            0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Followers
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-muted/20">
                        <div className="text-xl font-light text-primary mb-1">
                          {profileData.githubStats.following?.toLocaleString() ||
                            0}
                        </div>
                        <div className="text-xs font-light text-muted-foreground">
                          Following
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList className="bg-muted/30 border-border/20">
              <TabsTrigger value="projects" className="font-light">
                Projects
              </TabsTrigger>
              <TabsTrigger value="insights" className="font-light">
                Insights
              </TabsTrigger>
              <TabsTrigger value="activity" className="font-light">
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Projects</h2>
                <Button variant="outline" className="font-light">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {projects.length}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Projects
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {projects
                      .reduce((sum, project) => sum + (project.stars || 0), 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Stars
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {projects.reduce(
                      (sum, project) => sum + (project.forks || 0),
                      0,
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Forks
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {projects.filter((p) => p.featured).length}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Featured
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fetch and display actual user projects from the API */}
                {projectsLoading ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">Loading projects...</p>
                  </div>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <Card
                      key={project.id}
                      className="border-border/20 bg-card/20 hover-lift"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Code2 className="h-4 w-4" />
                            <CardTitle className="text-lg font-light">
                              {project.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            {project.featured && (
                              <Badge
                                variant="outline"
                                className="font-light border-primary/30 text-xs uppercase tracking-[0.1em]"
                              >
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
                              <span>
                                {project.stars?.toLocaleString() || 0}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="h-3 w-3" />
                              <span>{project.forks || 0}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="font-light border-border/30 text-xs"
                            >
                              {project.language || "N/A"}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">
                            Updated {project.updatedAt || "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(project.tags || []).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="font-light border-border/30 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">
                      No projects to display
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Insights</h2>
                <Button variant="outline" className="font-light">
                  <Plus className="mr-2 h-4 w-4" />
                  Write New
                </Button>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {insights.length}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Posts
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {insights.reduce((sum, insight) => sum + insight.likes, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Likes
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {insights.reduce(
                      (sum, insight) => sum + insight.comments,
                      0,
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Total Comments
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <div className="text-2xl font-light text-primary">
                    {insights.filter((i) => i.publishedAt).length}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.05em] mt-1">
                    Published
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Fetch and display actual user blog posts from the API */}
                {insightsLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading insights...</p>
                  </div>
                ) : insights.length > 0 ? (
                  insights.map((insight) => (
                    <Card
                      key={insight.id}
                      className="border-border/20 bg-card/20 hover-lift"
                    >
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-light mb-3 hover:text-primary cursor-pointer transition-colors">
                          {insight.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-light text-muted-foreground story-text">
                          {insight.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                            <span>{insight.publishedAt}</span>
                            <span>{insight.readTime}</span>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{insight.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{insight.comments}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="font-light border-border/30 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No insights to display
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="mb-8">
                <h2 className="text-2xl font-light">Recent Activity</h2>
              </div>

              <Card className="border-border/20 bg-card/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Fetch and display actual user activity from the API */}
                    {activityLoading ? (
                      <p className="text-muted-foreground">
                        Loading activity...
                      </p>
                    ) : activity.length > 0 ? (
                      activity.map((activityItem) => (
                        <div
                          key={activityItem.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-light">
                              <span className="text-foreground">
                                {activityItem.action}
                              </span>
                              <span className="text-primary font-mono mx-2">
                                {activityItem.target}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {activityItem.timeAgo}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No recent activity
                      </p>
                    )}
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
