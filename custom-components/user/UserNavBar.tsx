"use client";
import React from "react";
import UserNavBarLink from "./UserNavBarLink";
import UserSearchBox from "./UserSearchBox";
import { CircleUserRound, ShoppingBag } from "lucide-react";

const UserNavBar = () => {
  return (
    <div className="grid grid-cols-6 items-center p-5">
      <div className="col-span-5 col-start-2 flex items-center">
        <div className="flex-none">
          <UserNavBarLink linkName="home" href="/" />
          <UserNavBarLink linkName="about Us" href="/about" />
        </div>
        <UserSearchBox />
        <div className="p-1 flex">
          <ShoppingBag size={28} strokeWidth={1.75} className="" />
          <CircleUserRound size={28} strokeWidth={1.75} className="ms-3" />
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
