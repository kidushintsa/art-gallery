"use client";
import React from "react";
import NavLink from "./NavLink";
import UserSearchBox from "./UserSearchBox";
import { CircleUserRound, ShoppingBag } from "lucide-react";

const NavBar = () => {
  return (
    <div className="grid grid-cols-6 border items-center p-5 bg-orange-100">
      <div className="col-span-5 col-start-2 border flex items-center">
        <div className="border flex-none">
          <NavLink linkName="home" href="/home" />
          <NavLink linkName="about Us" href="/about" />
        </div>
        <UserSearchBox />
        <div className="border p-1 flex">
          <ShoppingBag size={28} strokeWidth={1.75} className="border" />
          <CircleUserRound
            size={28}
            strokeWidth={1.75}
            className="border ms-3"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
