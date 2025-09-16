import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  GitFork,
  Settings
} from "lucide-react";
import Link from "next/link";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "collaboration",
    title: "Collaboration Request",
    message: "Sarah Chen wants to collaborate on your react-dashboard project",
    user: {
      name: "Sarah Chen",
      username: "sarahdev",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    type: "like",
    title: "Blog Post Liked",
    message: "Alex Rodriguez liked your blog post 'Building Scalable React Applications'",
    user: {
      name: "Alex Rodriguez",
      username: "alexdev",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "4 hours ago",
    unread: true
  },
  {
    id: 3,
    type: "follow",
    title: "New Follower",
    message: "Mike Johnson started following you",
    user: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "1 day ago",
    unread: false
  },
  {
    id: 4,
    type: "star",
    title: "Repository Starred",
    message: "Emma Davis starred your repository 'api-toolkit'",
    user: {
      name: "Emma Davis",
      username: "emmad",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "2 days ago",
    unread: false
  },
  {
    id: 5,
    type: "comment",
    title: "New Comment",
    message: "David Kim commented on your blog post 'TypeScript Tips for Better Code'",
    user: {
      name: "David Kim",
      username: "davidk",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "3 days ago",
    unread: false
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "collaboration":
      return <Code2 className="h-5 w-5 text-blue-500" />;
    case "like":
      return <Heart className="h-5 w-5 text-red-500" />;
    case "follow":
      return <UserPlus className="h-5 w-5 text-green-500" />;
    case "star":
      return <Star className="h-5 w-5 text-yellow-500" />;
    case "comment":
      return <MessageCircle className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter(n => n.unread).length;

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
            <Link href="/notifications" className="text-primary font-medium">Notifications</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} new</Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className={notification.unread ? "border-primary/50 bg-primary/5" : ""}>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-3 mt-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback className="text-xs">
                              {notification.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            @{notification.user.username}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    
                    {/* Action buttons for collaboration requests */}
                    {notification.type === "collaboration" && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm">Accept</Button>
                        <Button variant="outline" size="sm">Decline</Button>
                      </div>
                    )}
                    
                    {/* Action buttons for follows */}
                    {notification.type === "follow" && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm">Follow Back</Button>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state (when no notifications) */}
        {mockNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you get notifications about collaborations, likes, and follows, they'll show up here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}