import { Button } from "@/components/ui/button";
import React from "react";

const Receipt = () => {
  return (
    <div className="bg-gray-200 flex flex-col p-6">
      <h1 className="font-bold mb-3">Receipt Downloader</h1>
      <input
        type="text"
        placeholder="Recipt Number"
        className="p-2 ps-3 w-[70%] rounded-3xl bg-white shadow-lg border-gray-600"
      />
      <Button className="w-[50%] mx-auto mt-5 rounded-4xl cursor-pointer">
        Download as PDF
      </Button>
    </div>
  );
};

export default Receipt;
