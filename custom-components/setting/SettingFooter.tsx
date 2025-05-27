import React from "react";
// import SettingItem from "./SettingItem";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import Dropdown from "./DropDown";

const SettingFooter = () => {
  return (
    <section className="bg-gray-300 border border-e-green-500 w-[23%] p-4">
      <h2 className="font-bold">Settings</h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-700"></span>
        <Dropdown />
      </div>
    </section>
  );
};

export default SettingFooter;
