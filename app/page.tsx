import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Code2,
  Terminal,
  Coffee,
  Users,
  Newspaper,
  MessageSquare,
  Star,
  GitFork,
  ArrowRight,
  Play,
  Quote,
  Zap,
  TrendingUp,
  Minus,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Asymmetric Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-5 h-5 bg-foreground flex items-center justify-center">
                <Minus className="h-2 w-2 text-background" />
              </div>
              <span className="text-base font-light tracking-[0.2em]">MERGE</span>
            </div>
            <nav className="hidden lg:flex items-center space-x-16">
              <Link href="#platform" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.15em]">
                Platform
              </Link>
              <Link href="#work" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.15em]">
                Work
              </Link>
              <Link href="#community" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.15em]">
                Community
              </Link>
            </nav>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="font-light text-xs uppercase tracking-[0.1em]" asChild>
                <Link href="/auth/signin">Enter</Link>
              </Button>
              <Button size="sm" className="font-light bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-[0.1em] px-6" asChild>
                <Link href="/auth/signin">Begin</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Unconventional Hero */}
      <section className="min-h-screen pt-24 px-8 relative overflow-hidden">
        {/* Interactive Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 30s linear infinite'
          }}></div>

          {/* Floating Code Symbols */}
          <div className="absolute top-1/4 left-1/4 text-muted-foreground/20 text-6xl font-mono animate-pulse select-none">
            {'{}'}
          </div>
          <div className="absolute top-1/3 right-1/3 text-muted-foreground/20 text-4xl font-mono animate-pulse select-none" style={{ animationDelay: '2s' }}>
            {'</>'}
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-muted-foreground/20 text-5xl font-mono animate-pulse select-none" style={{ animationDelay: '4s' }}>
            {'()'}
          </div>
          <div className="absolute top-1/2 right-1/4 text-muted-foreground/20 text-3xl font-mono animate-pulse select-none" style={{ animationDelay: '6s' }}>
            {'[]'}
          </div>

          {/* Subtle Particles */}
          <div className="absolute top-1/4 right-1/2 w-2 h-2 bg-muted-foreground/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-muted-foreground/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-muted-foreground/30 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
        </div>

        {/* Static Design Elements */}
        <div className="absolute top-32 right-16 text-[200px] font-extralight text-muted-foreground/5 select-none">
          01
        </div>
        <div className="absolute bottom-32 left-16 w-px h-32 bg-border/30"></div>

        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start min-h-[80vh]">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 pt-16">
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-px bg-foreground"></div>
                  <Badge variant="outline" className="px-3 py-1 text-xs font-light border-border/30 uppercase tracking-[0.15em]">
                    Developer Platform
                  </Badge>
                </div>

                <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight mb-12 cinematic-hero tracking-[-0.04em] leading-[0.85]">
                  WHERE
                  <br />
                  <span className="text-muted-foreground">CODE</span>
                  <br />
                  LIVES
                </h1>
              </div>

              <div className="max-w-lg space-y-8">
                <p className="text-lg font-light text-muted-foreground story-text leading-relaxed">
                  A space for developers who appreciate beautiful code, thoughtful design,
                  and meaningful connections. Show your work, share your thoughts, find your people.
                </p>

                <div className="flex items-center space-x-6">
                  <Button size="lg" className="font-light bg-foreground text-background hover:bg-foreground/90 px-8 py-6 h-auto text-sm uppercase tracking-[0.1em]" asChild>
                    <Link href="/auth/signin">
                      <Github className="mr-3 h-4 w-4" />
                      Join the Community
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" className="font-light px-0 py-6 h-auto text-sm uppercase tracking-[0.1em] hover:bg-transparent" asChild>
                    <Link href="#work" className="flex items-center space-x-3">
                      <span>Explore Work</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Community Vibe */}
            <div className="lg:col-span-5 pt-32">
              <div className="space-y-16">
                {/* Community Feel */}
                <div className="space-y-8">
                  <div className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em] mb-6">
                    For Creators
                  </div>
                  <div className="space-y-6">
                    <div className="text-sm font-light text-muted-foreground story-text">
                      "Finally, a place where code quality matters more than follower count."
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/70">
                      — @neural_architect
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-sm font-light text-muted-foreground story-text">
                      "The design aesthetic alone makes me want to write better code."
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/70">
                      — @pixel_perfectionist
                    </div>
                  </div>
                </div>

                {/* What Makes It Special */}
                <div className="space-y-6">
                  <div className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                    Philosophy
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm font-light">
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <span>Craft over quantity</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-light">
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <span>Quality over metrics</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-light">
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <span>Design matters</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-light">
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <span>Community first</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features - Editorial Layout */}
      <section id="platform" className="py-32 px-8 border-t border-border/20 relative">
        <div className="absolute top-16 right-8 text-xs font-mono text-muted-foreground/30">
          02
        </div>

        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Section Header */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-6 h-px bg-muted-foreground/30"></div>
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                    Platform
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light mb-8 cinematic-text tracking-[-0.02em] leading-tight">
                  BUILT FOR
                  <br />
                  <span className="text-muted-foreground">DEVELOPERS</span>
                </h2>
                <p className="text-base font-light text-muted-foreground story-text max-w-sm">
                  Tools that respect your craft. Features that enhance your creativity.
                  A community that values quality over quantity.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/20 bg-card/30 hover-lift">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 bg-muted/30 flex items-center justify-center">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground/50">01</div>
                    </div>
                    <CardTitle className="text-lg font-light mb-3">Project Showcase</CardTitle>
                    <CardDescription className="text-sm font-light text-muted-foreground story-text">
                      Sync your GitHub repositories automatically. Add custom descriptions,
                      live demos, and showcase your best work.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-border/20 bg-card/30 hover-lift">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 bg-muted/30 flex items-center justify-center">
                        <Quote className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground/50">02</div>
                    </div>
                    <CardTitle className="text-lg font-light mb-3">Developer Insights</CardTitle>
                    <CardDescription className="text-sm font-light text-muted-foreground story-text">
                      Share your knowledge through blogs with markdown support,
                      syntax highlighting, and rich media.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-border/20 bg-card/30 hover-lift">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 bg-muted/30 flex items-center justify-center">
                        <Newspaper className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground/50">03</div>
                    </div>
                    <CardTitle className="text-lg font-light mb-3">Curated News</CardTitle>
                    <CardDescription className="text-sm font-light text-muted-foreground story-text">
                      Stay updated with tech news from trusted sources.
                      Never miss important industry developments.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-border/20 bg-card/30 hover-lift">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 bg-muted/30 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-mono text-muted-foreground/50">04</div>
                    </div>
                    <CardTitle className="text-lg font-light mb-3">Direct Connect</CardTitle>
                    <CardDescription className="text-sm font-light text-muted-foreground story-text">
                      Message other developers directly. Send collaboration requests
                      and build meaningful connections.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work - Asymmetric Layout */}
      <section id="work" className="py-32 px-8 border-t border-border/20 relative">
        <div className="absolute top-16 left-8 text-xs font-mono text-muted-foreground/30">
          03
        </div>

        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-6 h-px bg-muted-foreground/30"></div>
                  <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                    Featured Work
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light cinematic-text tracking-[-0.02em] leading-tight">
                  DISCOVER
                  <br />
                  <span className="text-muted-foreground">AMAZING WORK</span>
                </h2>
              </div>
              <div className="hidden md:block text-sm font-light text-muted-foreground">
                Curated by the community, for the community
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/20 bg-card/20 hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
                    Featured
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground font-mono">
                    <Star className="h-3 w-3" />
                    <span>2.1k</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-light mb-3">Neural Network Visualizer</CardTitle>
                <CardDescription className="font-light text-muted-foreground story-text text-sm mb-6">
                  Real-time visualization of neural network training processes.
                  Built with Three.js and WebGL shaders for maximum performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs">TypeScript</Badge>
                  <Badge variant="outline" className="font-light border-border/30 text-xs">WebGL</Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-4 h-4 bg-muted/50 rounded-full" />
                  <span className="font-mono">@neural_dev</span>
                  <X className="h-2 w-2" />
                  <span>3 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/20 hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
                    Trending
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground font-mono">
                    <GitFork className="h-3 w-3" />
                    <span>847</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-light mb-3">Quantum State Manager</CardTitle>
                <CardDescription className="font-light text-muted-foreground story-text text-sm mb-6">
                  State management inspired by quantum mechanics principles.
                  Superposition meets React in this experimental library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs">React</Badge>
                  <Badge variant="outline" className="font-light border-border/30 text-xs">Quantum</Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-4 h-4 bg-muted/50 rounded-full" />
                  <span className="font-mono">@quantum_coder</span>
                  <X className="h-2 w-2" />
                  <span>1 week ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/20 hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs uppercase tracking-[0.1em]">
                    Experimental
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground font-mono">
                    <Star className="h-3 w-3" />
                    <span>1.3k</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-light mb-3">Poetic Code Generator</CardTitle>
                <CardDescription className="font-light text-muted-foreground story-text text-sm mb-6">
                  AI that writes code like poetry. Where functionality meets beauty
                  in perfect harmony. The future of expressive programming.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline" className="font-light border-border/30 text-xs">Python</Badge>
                  <Badge variant="outline" className="font-light border-border/30 text-xs">AI</Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-4 h-4 bg-muted/50 rounded-full" />
                  <span className="font-mono">@code_poet</span>
                  <X className="h-2 w-2" />
                  <span>5 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action - Minimal */}
      <section id="community" className="py-32 px-8 border-t border-border/20 relative">
        <div className="absolute top-16 right-8 text-xs font-mono text-muted-foreground/30">
          04
        </div>

        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-8 h-px bg-foreground"></div>
                <span className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                  Join Us
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-light mb-8 cinematic-text tracking-[-0.02em] leading-tight">
                READY TO
                <br />
                <span className="text-muted-foreground">BEGIN?</span>
              </h2>

              <p className="text-lg font-light text-muted-foreground story-text mb-12 max-w-lg">
                Connect your GitHub and become part of a community that celebrates
                thoughtful code, elegant design, and meaningful collaboration.
              </p>

              <div className="flex items-center space-x-8">
                <Button size="lg" className="font-light bg-foreground text-background hover:bg-foreground/90 px-8 py-6 h-auto text-sm uppercase tracking-[0.1em]" asChild>
                  <Link href="/auth/signin">
                    <Github className="mr-3 h-4 w-4" />
                    Join the Community
                  </Link>
                </Button>
                <div className="text-xs font-light text-muted-foreground">
                  <div>For creators, by creators</div>
                  <div>Always free</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-6 text-right">
                <div className="text-xs font-light text-muted-foreground uppercase tracking-[0.2em]">
                  What We Believe
                </div>
                <div className="space-y-3 text-sm font-light">
                  <div className="flex items-center justify-end space-x-3">
                    <span>Code is art</span>
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <span>Design matters</span>
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <span>Community over competition</span>
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <span>Quality over quantity</span>
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t border-border/20 py-20 px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-4 h-4 bg-foreground flex items-center justify-center">
                  <Minus className="h-1 w-1 text-background" />
                </div>
                <span className="text-sm font-light tracking-[0.2em]">MERGE</span>
              </div>
              <p className="text-sm font-light text-muted-foreground story-text max-w-xs">
                The social platform built by developers, for developers.
                With obsessive attention to detail.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xs font-light mb-6 text-muted-foreground uppercase tracking-[0.15em]">Product</h3>
                  <ul className="space-y-3 text-sm font-light text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">API</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-light mb-6 text-muted-foreground uppercase tracking-[0.15em]">Community</h3>
                  <ul className="space-y-3 text-sm font-light text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground transition-colors">Discord</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Twitter</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">GitHub</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-light mb-6 text-muted-foreground uppercase tracking-[0.15em]">Support</h3>
                  <ul className="space-y-3 text-sm font-light text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground transition-colors">Help</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Status</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-light mb-6 text-muted-foreground uppercase tracking-[0.15em]">Legal</h3>
                  <ul className="space-y-3 text-sm font-light text-muted-foreground">
                    <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                    <li><Link href="#" className="hover:text-foreground transition-colors">Cookies</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 flex items-center justify-between">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-[0.15em]">
              © 2025 Merge
            </p>
            <div className="text-xs font-mono text-muted-foreground/50">
              v1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}