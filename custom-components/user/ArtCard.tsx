"use client";

import Image from "next/image";
import { Eye, User, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./addToCart";
import { useState } from "react";

const ArtCard = ({
  id,
  src,
  alt,
  title,
  description,
  artist,
  price,
}: {
  id?: string;
  src: string;
  artist: string;
  price: number;
  alt: string;
  title: string;
  description: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 60; // Character limit before showing "See more"
  const shouldTruncate = description.length > maxLength;

  const displayDescription =
    shouldTruncate && !isExpanded
      ? description.slice(0, maxLength) + "..."
      : description;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container with Overlay */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full h-72 cursor-pointer overflow-hidden">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <Button
                size="icon"
                variant="secondary"
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
            </div>

            {/* View Full Image Badge */}
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Badge className="bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm">
                <Eye className="w-3 h-3 mr-1" />
                View Full Image
              </Badge>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="p-0 max-w-5xl max-h-[90vh]">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative w-full h-[80vh] bg-black rounded-lg overflow-hidden">
            <Image
              src={src || "/placeholder.svg"}
              alt="Full artwork"
              fill
              className="object-contain"
            />

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By {artist}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">
                    {price.toLocaleString()} ETB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <div className="mb-2">
            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">
              {title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {displayDescription}
            </p>

            {/* See More/Hide Button */}
            {shouldTruncate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="inline-flex items-center gap-1 mt-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>See more</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">By {artist}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">
              {price.toLocaleString()}
            </span>
            <span className="text-lg font-medium text-gray-600">ETB</span>
          </div>

          <div className="flex items-center gap-2">
            <AddToCartButton id={id!} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ArtCard;
