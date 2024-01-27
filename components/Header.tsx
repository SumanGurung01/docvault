import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
    return (
        <div className="flex items-center justify-between px-4 py-3">
            <Link href="/">
                <img
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
