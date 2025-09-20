import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ExternalLink,
  Star,
  GitFork
} from "lucide-react";

interface FeedCardProps {
  item: {
    id: number;
    type: string;
    title: string;
    description: string;
    author: {
      name: string;
      username: string;
      avatar: string;
    };
    stats: any;
    tags: string[];
    timeAgo: string;
    featured?: boolean;
  };
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <Card className={`border-border/20 bg-card/30 hover-lift ${item.featured ? 'border-accent/20' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.author.avatar} />
              <AvatarFallback className="text-xs">{item.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-light">{item.author.name}</p>
              <p className="text-xs text-muted-foreground font-mono">@{item.author.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {item.featured && (
              <Badge variant="outline" className="font-light border-accent/30 text-xs uppercase tracking-[0.1em]">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
              {item.type}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">{item.timeAgo}</span>
          </div>
        </div>
        
        <CardTitle className="text-xl font-light mb-3 hover:text-accent cursor-pointer transition-colors">
          {item.title}
        </CardTitle>
        <CardDescription className="text-sm font-light text-muted-foreground story-text leading-relaxed">
          {item.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="font-light border-border/30 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
            {item.type === 'project' && (
              <>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{item.stats.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="h-3 w-3" />
                  <span>{item.stats.forks}</span>
                </div>
              </>
            )}
            {item.type === 'blog' && (
              <>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{item.stats.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{item.stats.comments}</span>
                </div>
                <span>{item.stats.readTime}</span>
              </>
            )}
            {item.type === 'news' && (
              <>
                <span>{item.stats.points} points</span>
                <span>{item.stats.comments} comments</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="font-light btn-ghost-subtle hover:text-red-400">
            <Heart className="mr-2 h-3 w-3" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="font-light btn-ghost-subtle hover:text-blue-400">
            <MessageCircle className="mr-2 h-3 w-3" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="font-light btn-ghost-subtle hover:text-green-400">
            <Share className="mr-2 h-3 w-3" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="font-light btn-ghost-subtle ml-auto">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}