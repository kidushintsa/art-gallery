"use client";

import { useEffect, useState } from "react";
import ArtCard from "./artCard";

interface PublicArtwork {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  user: {
    name: string | null;
  };
}

const ArtGrid = () => {
  const [artworks, setArtworks] = useState<PublicArtwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("/api/artworks/public");
        if (!res.ok) throw new Error("Failed to fetch artworks");
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error("Error fetching artworks:", err);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <p className="py-5 text-2xl text-center">Loading artworks...</p>;
  }

  return (
    <>
      {artworks.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-2 py-3">
          {artworks.map(({ id, title, user, description, price, imageUrl }) => (
            <ArtCard
              key={id}
              id={id}
              alt={title}
              artist={user.name || "Unknown Artist"}
              description={description}
              price={price}
              src={imageUrl}
            />
          ))}
        </div>
      ) : (
        <p className="py-5 text-4xl text-center">No Artwork found 😥</p>
      )}
    </>
  );
};

export default ArtGrid;
