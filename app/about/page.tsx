"use client";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { status, data } = useSession();
  return (
    <div className="grid place-items-center w-full h-screen text-7xl">
      {status === "authenticated" ? <h1>{data.user?.name}</h1> : "no user"}
      <h1>ABOUT Page</h1>
    </div>
  );
};

export default page;
