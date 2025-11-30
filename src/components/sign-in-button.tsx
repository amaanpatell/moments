"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import SignInDialog from "@/app/(auth)/sign-in/page";

const SignInButton = () => {
  const [signingInOpen, setSigningInOpen] = useState(false);

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

export default SignInButton;
