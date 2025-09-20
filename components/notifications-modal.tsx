import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  GitFork,
  Code2,
  Check,
  X,
  Archive
} from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: 1,
    type: "collaboration",
    title: "Collaboration Request",
    message: "Sarah Chen wants to collaborate on your neural-canvas project.",
    user: {
      name: "Sarah Chen",
      username: "neural_dev",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "2h",
    unread: true,
    actionable: true
  },
  {
    id: 2,
    type: "star",
    title: "Project Starred",
    message: "Alex Rodriguez starred your quantum-state-manager repository.",
    user: {
      name: "Alex Rodriguez",
      username: "quantum_coder",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "4h",
    unread: true,
    actionable: false
  },
  {
    id: 3,
    type: "follow",
    title: "New Follower",
    message: "Maya Patel started following you.",
    user: {
      name: "Maya Patel",
      username: "maya_builds",
      avatar: "/api/placeholder/40/40"
    },
    timestamp: "1d",
    unread: false,
    actionable: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "collaboration":
      return <Code2 className="h-4 w-4 text-blue-400" />;
    case "star":
      return <Star className="h-4 w-4 text-yellow-400" />;
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-400" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 pt-20">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10" onClick={onClose} />
      <Card className="relative w-96 max-h-[80vh] overflow-hidden border-border/20 bg-card/95 backdrop-blur-sm">
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light">Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="font-light text-xs">
                Mark all read
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className={`p-4 border-b border-border/10 hover:bg-muted/30 ${notification.unread ? 'bg-accent/5' : ''}`}>
              <div className="flex space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-light">{notification.message}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      )}
                      <span className="text-xs text-muted-foreground font-mono">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback className="text-xs">
                        {notification.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground font-mono">
                      @{notification.user.username}
                    </span>
                  </div>
                  
                  {notification.actionable && (
                    <div className="flex items-center space-x-2">
                      {notification.type === "collaboration" && (
                        <>
                          <Button size="sm" className="font-light bg-accent text-accent-foreground h-7 text-xs">
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="font-light h-7 text-xs">
                            Decline
                          </Button>
                        </>
                      )}
                      {notification.type === "follow" && (
                        <Button size="sm" className="font-light bg-accent text-accent-foreground h-7 text-xs">
                          Follow Back
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}