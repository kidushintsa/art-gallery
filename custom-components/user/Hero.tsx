"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <>
      <div className="pt-8 px-4 md:hidden">
        <h1 className="text-4xl font-bold">Discover new Art</h1>
      </div>
      <div className="h-screen bg-[url('/images/img6.jpg')] bg-cover bg-center hidden md:block">
        <div className="backdrop-blur-sm h-full">
          <div
            className="text-white text-4xl font-bold p-4 rounded grid place-items-center bg-transparent h-[70%] backdrop-blur-sm

"
          >
            <h1 className="text-white">
              <span>
                <Typewriter
                  words={[
                    "Express your feeling in Art",
                    "Discover creativity",
                    "Share your imagination",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
          </div>
          <section
            className="ps-20 w-fit text-end backdrop-blur-sm
"
          >
            <h2 className="text-white text-2xl font-semibold font-serif">
              Discover new Art
            </h2>
            <Button className="bg-violet-600 rounded-3xl py-0 px-8 mt-2 cursor-pointer hover:bg-violet-500">
              Explore
            </Button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
