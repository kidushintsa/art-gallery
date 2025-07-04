"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  Search,
  ShoppingCart,
  LogOut,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { SearchBar } from "./serachBar";

import { useRouter } from "next/navigation";

import MobileMenu from "./mobile-menu";

import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data: session } = useSession();

  const username = status === "authenticated" ? session.user.name : "user";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile Header */}

        <div className="flex items-center justify-between w-full md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <Link href="/" className="font-bold text-xl">
            Art Gallery
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={() => router.push("/dashboard/user/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Desktop Header */}

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            Home
          </Link>

          <Link href="/about" className="text-muted-foreground">
            About us
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search your artist or art..."
              className="w-full pl-8 rounded-md"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* User Name */}
          <span
            className="text-sm text-gray-700 font-medium"
            title={`Logged in as ${username}`}
          >
            {username}
          </span>

          {/* Complain */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Complain"
            title="File a Complaint"
            onClick={() => router.push("/dashboard/user/complain")}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            title="Shopping Cart"
            onClick={() => router.push("/dashboard/user/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Logout */}
          <Button
            className="text-gray-700 hover:bg-gray-100 bg-gray-50"
            title="Sign Out"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Mobile Search Bar */}

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
