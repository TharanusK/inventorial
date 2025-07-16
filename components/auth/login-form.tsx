"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SideBanner } from "./side-banner";

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full justify-center">
      <div
        className={cn("flex flex-col gap-6 md:w-1/2 ", className)}
        {...props}
      >
        <Card className="md:rounded-r-none h-full p-9 ">
          <CardHeader className="gap-2">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-9 ">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-foreground"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-error">{error}</p>}
                <Button
                  type="submit"
                  className="w-full color-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-9 text-sm flex flex-col gap-3">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex-1 border-t border-muted" />
                  <span className="whitespace-nowrap">
                    Don’t have an account?
                  </span>
                  <div className="flex-1 border-t border-muted" />
                </div>

                <Button
                  asChild
                  size="lg"
                  variant={"outline"}
                  className="rounded-40 text-foreground hover:text-foreground/80"
                >
                  <Link href="/auth/sign-up">Create an account</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block w-1/2 bg-primary rounded-r-xl">
        <SideBanner />
      </div>
    </div>
  );
}
