"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Code2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function SignUpPage() {
  const { githubAuth } = useAuth();

  const handleGitHubAuth = () => {
    githubAuth();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Merge</span>
          </Link>
          <h1 className="text-2xl font-bold">Join Merge</h1>
          <p className="text-muted-foreground">Create your developer profile</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Connect with your GitHub account to create your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={handleGitHubAuth}>
              <Github className="mr-2 h-5 w-5" />
              Sign Up with GitHub
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}