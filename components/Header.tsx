import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";
import Image from "next/image";

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Link href="/">
        <Image
          src="/logo.png"
          width={140}
          height={150}
          alt="Website Logo"
          className="rounded-md dark:invert"
        />
      </Link>

      <div className="flex items-center justify-center gap-3">
        <ThemeToggler />

        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
