import React from "react";
import { Header } from "@/custom-components/user/header";
import Hero from "@/custom-components/user/Hero";
import ArtGrid from "@/custom-components/user/artGrid";
const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <ArtGrid />
    </>
  );
};

export default page;
