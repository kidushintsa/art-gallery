"use client";
import React, { useState } from "react";
import { Header } from "@/custom-components/user/header";
import Hero from "@/custom-components/user/Hero";
import ArtGrid from "@/custom-components/user/artGrid";
// import { signOut} from "next-auth/react";
// import Link from "next/link";
const Just = () => {
  const [searchTitle, setSearchTitle] = useState("");
  return (
    <>
      <Header setSearchTitle={setSearchTitle} title={searchTitle} />
      <Hero />
      <ArtGrid tit={searchTitle} />
    </>
  );
};

export default Just;
