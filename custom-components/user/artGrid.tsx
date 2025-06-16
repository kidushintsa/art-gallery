import images from "@/data/Images";
import React from "react";
import ArtCard from "./artCard";

const ArtGrid = () => {
  return (
    <>
      {images.length != 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-2 py-3">
          {images.map(({ id, alt, artist, description, price, src }) => (
            <ArtCard
              id={id}
              alt={alt}
              artist={artist}
              description={description}
              price={price}
              src={src}
              key={id}
            />
          ))}
        </div>
      ) : (
        <p className="py-5 text-4xl text-center">No Artwork found😥</p>
      )}
    </>
  );
};

export default ArtGrid;
