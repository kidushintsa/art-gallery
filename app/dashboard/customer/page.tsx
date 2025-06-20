"use client";
import React from "react";
import { Header } from "@/custom-components/user/header";
import Hero from "@/custom-components/user/Hero";
import ArtGrid from "@/custom-components/user/artGrid";
import { signOut } from "next-auth/react";
const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <ArtGrid />
      <button onClick={() => signOut({ callbackUrl: "/" })}>sign out</button>
    </>
  );
};

export default page;
