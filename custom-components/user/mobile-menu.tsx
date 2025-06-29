"use client";
import Link from "next/link";
import { X, Settings, LogOut, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type React from "react";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-100 shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-lg">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2 bg-gray-300">
          <Link
            href="/dashboard/customer"
            className="block py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            About us
          </Link>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <button
              onClick={() => {
                onClose();
                router.push("/settings");
              }}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button
              onClick={() => {
                onClose();
                router.push("/complain");
              }}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Complain
            </button>
            <button
              onClick={() => {
                onClose();
                // Add your logout logic here
                signOut({ callbackUrl: "/" });
              }}
              className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
