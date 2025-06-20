"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "./mobile-menu";
import { SearchBar } from "./serachBar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-6 w-6" />
          </Button>
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
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
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
