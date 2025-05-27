import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PaintingGallery() {
  const categories = [
    { name: "painting", active: true },
    { name: "photography", active: false },
    { name: "Sculpture", active: false },
  ];

  const artworks = [
    {
      id: 1,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Kelas Abdoune",
      title: "Abstract Art",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Daniel Arsila",
      title: "Portrait",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Noel Gessner",
      title: "Landscape",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Donfre walker",
      title: "Modern Art",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Kelas Abdoune",
      title: "Contemporary",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Kelas Abdoune",
      title: "Abstract",
    },
    {
      id: 7,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Daniel Arsila",
      title: "Portrait Study",
    },
    {
      id: 8,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Noel Gessner",
      title: "Nature",
    },
    {
      id: 9,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Donfre walker",
      title: "Urban Art",
    },
    {
      id: 10,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Kelas Abdoune",
      title: "Minimalist",
    },
    {
      id: 11,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Kelas Abdoune",
      title: "Expressionist",
    },
    {
      id: 12,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Daniel Arsila",
      title: "Still Life",
    },
    {
      id: 13,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Noel Gessner",
      title: "Abstract Form",
    },
    {
      id: 14,
      image: "/placeholder.svg?height=120&width=120",
      artist: "Donfre walker",
      title: "Color Study",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Painting</h1>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-700 p-0"
          >
            See all
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="w-32 flex-shrink-0">
            <h2 className="text-sm font-medium text-gray-900 mb-4">category</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`block text-left text-sm w-full ${
                    category.active
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Artwork Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={`${artwork.artist} - ${artwork.title}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-700 text-center font-medium">
                    {artwork.artist}
                  </p>
                </div>
              ))}

              {/* More Button */}
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-800 mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-900">More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
