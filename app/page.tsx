"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="font-bold text-xl">
            Art Gallery
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left side: Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/img1.jpg"
                  alt="Art Gallery"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right side: Text and CTAs */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Beautiful Artwork
              </h1>
              <p className="text-gray-600 mb-4 max-w-md">
                Explore our curated collection of unique art pieces from
                talented artists around the world.
              </p>
              <p className="text-gray-600 mb-8 max-w-md">
                Join as an artist to showcase your work or as a buyer to
                discover and purchase unique pieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  className="h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 cursor-pointer"
                  size="lg"
                  onClick={() => signIn("google")}
                  // router.push("/role-selection")
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4 max-w-md">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Art Gallery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
