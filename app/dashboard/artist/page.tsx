"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Justa = () => {
  const { status, data } = useSession();
  return (
    <div>
      artist page{" "}
      {status === "authenticated" && (
        <p>
          {data.user.email} <Link href="/api/auth/signout">signout</Link>
        </p>
      )}
    </div>
  );
};

export default Justa;
