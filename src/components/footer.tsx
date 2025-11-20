import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="font-montserrat mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
      <p className="flex items-center gap-2 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span
          style={{ fontFamily: "var(--font-puppies-play)" }}
          className="ml-2.5 scale-160"
        >
          Moments.
        </span>
      </p>

      <div className="flex items-center gap-3 text-sm dark:text-gray-300">
        {/* Social Icons */}
        <div className="flex items-center gap-3 ml-2">
          <Link
            href="https://x.com/amaanpatelll"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition"
          >
            <Twitter width={18} height={18} />
          </Link>

          <Link
            href="https://github.com/amaanpatell"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition"
          >
            <Github width={18} height={18} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/amaan-patel-8251061a1/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition"
          >
            <Linkedin width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
