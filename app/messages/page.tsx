import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video
} from "lucide-react";
import Link from "next/link";

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "sarahdev",
      avatar: "/api/placeholder/40/40",
      online: true
    },
    lastMessage: "Hey! I'd love to collaborate on that React project you posted about.",
    timestamp: "2m ago",
    unread: 2
  },
  {
    id: 2,
    user: {
      name: "Alex Rodriguez",
      username: "alexdev",
      avatar: "/api/placeholder/40/40",
      online: false
    },
    lastMessage: "Thanks for the feedback on my blog post!",
    timestamp: "1h ago",
    unread: 0
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/api/placeholder/40/40",
      online: true
    },
    lastMessage: "The TypeScript tips were really helpful 👍",
    timestamp: "3h ago",
    unread: 0
  }
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hey! I saw your React dashboard project and it looks amazing!",
    timestamp: "10:30 AM",
    isOwn: false
  },
  {
    id: 2,
    senderId: 2,
    content: "Thank you! I put a lot of work into making it responsive and accessible.",
    timestamp: "10:32 AM",
    isOwn: true
  },
  {
    id: 3,
    senderId: 1,
    content: "I'd love to collaborate on that React project you posted about. I have experience with TypeScript and testing.",
    timestamp: "10:35 AM",
    isOwn: false
  },
  {
    id: 4,
    senderId: 2,
    content: "That sounds great! Let me check out your GitHub profile first.",
    timestamp: "10:37 AM",
    isOwn: true
  },
  {
    id: 5,
    senderId: 1,
    content: "Sure thing! My username is @sarahdev. I've contributed to several open source projects.",
    timestamp: "10:38 AM",
    isOwn: false
  }
];

export default function MessagesPage() {
  const selectedConversation = mockConversations[0]; // For demo, select first conversation

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
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                  </CardTitle>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer border-l-2 ${
                        conversation.id === selectedConversation.id 
                          ? "border-primary bg-primary/5" 
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.avatar} />
                            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{conversation.user.name}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                              {conversation.unread > 0 && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.user.avatar} />
                        <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        @{selectedConversation.user.username} • {selectedConversation.user.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                  />
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}