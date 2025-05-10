"useclient";
import { Search } from "lucide-react";
import React from "react";

const UserSearchBox = () => {
  return (
    <div className="bg-gray-300 rounded-4xl py-2 ps-7 flex w-2/3 mx-auto border">
      <input
        type="search"
        placeholder="search your artist or art"
        className="border-none focus:outline-none w-[95%] placeholder:text-zinc-900"
      />
      <Search
        size={20}
        strokeWidth={2}
        className="text-zinc-900 self-center me-2"
      />
    </div>
  );
};

export default UserSearchBox;
