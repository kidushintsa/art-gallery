"use client";

import type React from "react";

// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  setSearchTitle: (t: string) => void;
  title: string;
}

export function SearchBar({
  isOpen,
  onClose,
  setSearchTitle,
  title,
}: SearchBarProps) {
  // const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Searching for:", searchQuery);
    // Implement search functionality here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 left-0 right-0 bg-background z-30 p-4 shadow-md"
        >
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your artist or art..."
                className="w-full pl-8"
                value={title}
                onChange={(e) => setSearchTitle(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
