"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Calendar, DollarSign } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface User {
  name: string;
}

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  createdAt: string;
  status: string;
  user: User;
}

interface ArtworkApprovalProps {
  artworks: Artwork[];
}

export default function ArtworkApproval({ artworks }: ArtworkApprovalProps) {
  const [artworkList, setArtworkList] = useState(artworks);

  const handleApprove = (id: string) => {
    setArtworkList((prev) => prev.filter((artwork) => artwork.id !== id));
    console.log(`Approved artwork with ID: ${id}`);
    // In real app: API call to approve artwork
  };

  const handleReject = (id: string) => {
    setArtworkList((prev) => prev.filter((artwork) => artwork.id !== id));
    console.log(`Rejected artwork with ID: ${id}`);
    // In real app: API call to reject/delete artwork
  };

  if (artworkList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pending artworks to review</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {artworkList.map((artwork) => (
        <div
          key={artwork.id}
          className="border border-gray-200 rounded-lg p-4 bg-white"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Artwork Image */}
            <div className="w-full md:w-32 h-32 flex-shrink-0">
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Artwork Details */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {artwork.title}
                </h3>
                <Badge variant="secondary" className="w-fit">
                  {artwork.status}
                </Badge>
              </div>

              <p className="text-gray-600">by {artwork.user.name}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{artwork.price.toLocaleString()} ETB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(artwork.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 md:w-32">
              <Button
                onClick={() => handleApprove(artwork.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                onClick={() => handleReject(artwork.id)}
                variant="destructive"
                size="sm"
              >
                <X className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
