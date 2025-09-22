"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { Minus, Github } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login, githubAuth } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = () => {
    githubAuth();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-foreground flex items-center justify-center">
              <Minus className="h-2 w-2 text-background" />
            </div>
            <span className="text-base font-light tracking-[0.2em]">MERGE</span>
          </Link>
        </div>

        <Card className="border-primary/20 bg-card/30">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-light">Welcome back</CardTitle>
            <CardDescription className="font-light text-sm">
              Sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-light text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-primary/30 font-light focus:border-primary/60"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-light text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-primary/30 font-light focus:border-primary/60"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded border border-red-500/20 font-light">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full font-light bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground font-light">or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full font-light border-primary/30 hover:bg-primary/10"
              onClick={handleGitHubAuth}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>

            <div className="text-center">
              <p className="text-sm font-light text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Test Accounts */}
            <div className="p-3 bg-primary/5 rounded border border-primary/20">
              <p className="text-xs font-light text-muted-foreground mb-2">Test accounts:</p>
              <div className="space-y-1 text-xs font-mono text-muted-foreground/80">
                <p>sarah@example.com / password123</p>
                <p>alex@example.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}