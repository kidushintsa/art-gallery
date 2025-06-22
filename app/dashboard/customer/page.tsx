"use client";
import React from "react";
import { Header } from "@/custom-components/user/header";
import Hero from "@/custom-components/user/Hero";
import ArtGrid from "@/custom-components/user/artGrid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const Just = () => {
  const { status, data } = useSession();

  return (
    <>
      <Header />
      <Hero />
      <ArtGrid />
      <button onClick={() => signOut({ callbackUrl: "/" })}>sign out</button>
      {status === "authenticated" && (
        <div className="bg-amber-400 text-black">
          <p>
            id:{data.user.id},, email:{data.user.email}
          </p>
          <Link href="/api/auth/signout">signout</Link>
        </div>
      )}
    </>
  );
};

export default Just;
