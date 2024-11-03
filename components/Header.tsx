import Link from "next/link";
import { UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              AIO Analysis Tool
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/dashboard"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center">
            <UserButton />
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
