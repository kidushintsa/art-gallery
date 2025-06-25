import images from "@/data/Images";
import React from "react";
import ArtCard from "./artCard";

const ArtGrid = () => {
  return (
    <>
      {images.length != 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-2 py-3">
          {images.map(({ id, title, user, description, price, imageUrl }) => (
            <ArtCard
              id={id}
              alt={title}
              artist={user.name}
              description={description}
              price={price}
              src={imageUrl}
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
