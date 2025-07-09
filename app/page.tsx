import Image from "next/image";
import Link from "next/link";
import GoogleLogin from "./googleLogin";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="font-bold text-xl">
            Art Gallery
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            About us
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
                {/* watch this code below might affect the login process if not working change to link componetn and use href */}
                <GoogleLogin />
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
