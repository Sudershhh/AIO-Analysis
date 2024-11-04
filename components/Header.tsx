import Link from "next/link";
import { UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
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
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-between px-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold"
          aria-label="AIO Analysis Tool Home"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link
                href="/dashboard"
                className="text-sm px-2 py-1 rounded hover:bg-accent"
              >
                Dashboard
              </Link>
            </NavigationMenuItem>
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

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
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
              <Link href="/dashboard" className="text-sm px-2 py-1.5">
                Dashboard
              </Link>
              <Link href="/about" className="text-sm px-2 py-1.5">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-7 w-7",
              },
            }}
          />
          <SignedOut>
            <SignInButton>
              <Button variant="default" size="sm" className="h-7 text-xs px-3">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
