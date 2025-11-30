"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chrome } from "lucide-react";

type SignInDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/studio",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Moments
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in with Google to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}