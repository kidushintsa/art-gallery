import React from "react";
import ArtCard from "./ArtCard";
import images from "@/data/Images";

const ArtCardGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-3">
      {images.map(({ id, src, alt, description, artist, price }) => (
        <ArtCard
          key={id}
          src={src}
          alt={alt}
          description={description}
          artist={artist}
          price={price}
        />
      ))}
    </div>
  );
};

export default ArtCardGrid;
