"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ArtCardProps } from "@/entities/artCard";

export default function CartCard({
  id,
  imageUrl,
  title,
  artist,
  price,
  onRemove,
}: ArtCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
          {title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm truncate">by {artist}</p>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            {price.toLocaleString()} ETB
          </p>
        </div>

        {onRemove && (
          <button
            onClick={() => onRemove(id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
