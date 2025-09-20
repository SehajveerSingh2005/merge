import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle,
  Send,
  X,
  Search
} from "lucide-react";

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockConversations = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "neural_dev",
      avatar: "/api/placeholder/40/40",
      online: true
    },
    lastMessage: "Hey! I'd love to collaborate on that React project.",
    timestamp: "2m",
    unread: 2
  },
  {
    id: 2,
    user: {
      name: "Alex Rodriguez",
      username: "quantum_coder",
      avatar: "/api/placeholder/40/40",
      online: false
    },
    lastMessage: "Thanks for the feedback on my blog post!",
    timestamp: "1h",
    unread: 0
  },
  {
    id: 3,
    user: {
      name: "Maya Patel",
      username: "maya_builds",
      avatar: "/api/placeholder/40/40",
      online: true
    },
    lastMessage: "The TypeScript tips were really helpful 👍",
    timestamp: "3h",
    unread: 0
  }
];

export function MessagesModal({ isOpen, onClose }: MessagesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 pt-20">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10" onClick={onClose} />
      <Card className="relative w-80 max-h-[80vh] overflow-hidden border-border/20 bg-card/95 backdrop-blur-sm">
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-light">Messages</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9 h-8 bg-muted/30 border-border/30 font-light text-sm"
            />
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {mockConversations.map((conversation) => (
            <div key={conversation.id} className="p-3 border-b border-border/10 hover:bg-muted/30 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback className="text-xs">{conversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.user.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-light truncate">{conversation.user.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground font-mono">{conversation.timestamp}</span>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-xs font-mono text-accent-foreground">{conversation.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">@{conversation.user.username}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border/20">
          <Button className="w-full font-light bg-accent text-accent-foreground" size="sm">
            <MessageCircle className="mr-2 h-3 w-3" />
            New Message
          </Button>
        </div>
      </Card>
    </div>
  );
}