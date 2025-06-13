"use client";
import { Button } from "@/components/ui/button";
import { Header } from "@/custom-components/user/header";
import Hero from "@/custom-components/user/Hero";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
};

export default page;

{
  /* <header className="ps-3 pt-4 font-semibold font-serif">
        <h1>Discover Art You Love From the Local</h1>
        <h1>Leading Online Gallery</h1>
      </header> 
      
      
       <>
      <div className="h-screen bg-[url('/images/img6.jpg')] bg-cover bg-center">
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
            <h2 className="text-white text-2xl font-semibold font-serif text-start">
              Explore more
            </h2>
            <Button className="bg-violet-600 rounded-3xl py-0 px-8 mt-2 cursor-pointer hover:bg-violet-500">
              sign up
            </Button>
            <Button className="bg-violet-600 rounded-3xl py-0 px-8 mt-2 cursor-pointer hover:bg-violet-500 ms-3">
              Log in
            </Button>
          </section>
        </div>
      </div>
    </>
      */
}
