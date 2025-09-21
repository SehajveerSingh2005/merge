"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { Minus } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-foreground flex items-center justify-center">
              <Minus className="h-3 w-3 text-background" />
            </div>
            <span className="text-xl font-light tracking-[0.2em]">MERGE</span>
          </Link>
        </div>

        <Card className="border-primary/20 bg-card/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-light">Welcome back</CardTitle>
            <CardDescription className="font-light">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-light">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/30 border-primary/20 font-light focus:border-primary/40"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-light">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/30 border-primary/20 font-light focus:border-primary/40"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded border border-red-500/20">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full font-light bg-primary text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-light text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 p-4 bg-primary/10 rounded border border-primary/20">
              <p className="text-sm font-light text-muted-foreground mb-2">Test accounts:</p>
              <div className="space-y-1 text-xs font-mono">
                <p>sarah@example.com / password123</p>
                <p>alex@example.com / password123</p>
                <p>emma@example.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}