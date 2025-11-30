import React from "react";
import { ThemeSwitch } from "./theme-switch";
import Logo from "./logo";
import UploadButton from "./upload/upload-button";
import AuthButton from "./auth-button";

const Navbar = () => {
  return (
    <nav className="border-l border-r border-dashed border-rose-100 dark:border-pink-300/20 mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-4 backdrop-blur-md lg:px-8">
      <Logo />
      <div className="flex items-center gap-2.5">
        <ThemeSwitch />

        <div className="flex min-w-8 gap-4">
          <UploadButton />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
