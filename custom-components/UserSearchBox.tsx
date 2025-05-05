import { Search } from "lucide-react";
import React from "react";

const UserSearchBox = () => {
  return (
    <div className="bg-gray-400 rounded-4xl py-2 ps-7 flex w-2/3 mx-auto">
      <input
        type="search"
        placeholder="search your artist or art"
        className="border-none focus:outline-none w-[95%] placeholder:text-zinc-900"
      />
      <Search size={20} strokeWidth={2} className="text-zinc-900 self-center" />
    </div>
  );
};

export default UserSearchBox;
