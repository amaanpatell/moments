"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { LogOut, Loader2, User as UserIcon, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import SignInDialog from "./SignInDialog";

const AuthButton = () => {
  const [signingInOpen, setSigningInOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const getUserInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const formatMemberSince = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  if (isPending) {
    return (
      <Button
        className="cursor-pointer rounded-full bg-linear-to-bl from-pink-400 to-pink-800 px-5 text-white"
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (session?.user) {
    const user = session.user;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 hover:bg-accent cursor-pointer"
            disabled={isSigningOut}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User avatar"}
              />
              <AvatarFallback className="bg-linear-to-bl from-pink-400 to-pink-800 text-white font-medium">
                {getUserInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User avatar"}
                  />
                  <AvatarFallback className="bg-linear-to-bl from-pink-400 to-pink-800 text-white font-medium text-lg">
                    {getUserInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name || "User"}
                  </p>
                  {user.email && (
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
              {user.createdAt && (
                <p className="text-xs text-muted-foreground">
                  Member since {formatMemberSince(user.createdAt)}
                </p>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isSigningOut ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        className="cursor-pointer rounded-full bg-linear-to-bl from-pink-400 to-pink-800 px-5 text-white"
        onClick={() => setSigningInOpen(true)}
      >
        Login
      </Button>
      <SignInDialog open={signingInOpen} onOpenChange={setSigningInOpen} />
    </>
  );
};

export default AuthButton;
