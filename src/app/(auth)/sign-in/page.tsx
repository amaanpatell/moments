"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Moments</h1>
          <p className="text-muted-foreground mt-2">
            Sign in with Google to continue
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="w-full cursor-pointer"
          size="lg"
        >
          <Chrome className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
