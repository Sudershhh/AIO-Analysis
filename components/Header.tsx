"use client";

import Link from "next/link";
import { UserButton, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-between px-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold flex items-center"
          aria-label="AIO Analysis Tool Home"
        >
          <Image src="/logo.png" alt="AIO Logo" width={32} height={32} />
          <span className="ml-2 text-xl">AIO</span>
        </Link>

        {/* Desktop Navigation and Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {isSignedIn ? (
                <NavigationMenuItem>
                  <Link
                    href="/dashboard"
                    className="text-sm px-2 py-1 rounded hover:bg-accent"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              ) : null}
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="text-sm px-2 py-1 rounded hover:bg-accent"
                >
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-7 w-7",
              },
            }}
          />
          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button
                variant="default"
                size="sm"
                className="h-7 text-xs px-3 font-bold"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-7 w-7",
              },
            }}
          />
          <SignedOut>
            <SignInButton fallbackRedirectUrl={"/dashboard"}>
              <Button
                variant="default"
                size="sm"
                className="h-7 text-xs px-3 font-bold mr-2"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-1"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-48">
              <nav className="flex flex-col space-y-2">
                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    className="text-sm px-2 py-1.5 font-bold"
                  >
                    Dashboard
                  </Link>
                ) : null}
                <Link href="/about" className="text-sm px-2 py-1.5 font-bold">
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
