"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Minus, Code2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function SignInPage() {
  const { githubAuth } = useAuth();

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
            <CardTitle className="text-xl font-light">Sign in</CardTitle>
            <CardDescription className="font-light text-sm">
              Connect with GitHub to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full font-light bg-primary text-primary-foreground hover:bg-primary/90" 
              size="lg"
              onClick={handleGitHubAuth}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>

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
              asChild
            >
              <Link href="/login">
                <Code2 className="mr-2 h-4 w-4" />
                Email
              </Link>
            </Button>
            
            <div className="text-center text-sm font-light text-muted-foreground/80">
              By signing in, you agree to our Terms and Privacy Policy
            </div>

            <div className="text-center">
              <p className="text-sm font-light text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}