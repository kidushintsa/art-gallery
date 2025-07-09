"use client";

import { CheckOut } from "@/entities/checkOut";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckOutButton = ({ empty, total }: CheckOut) => {
  const router = useRouter();
  return (
    <button
      className={
        !empty
          ? "w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          : "bg-emerald-700  text-white font-bold py-4 rounded-xl w-full cursor-not-allowed"
      }
      disabled={empty}
      onClick={async () => {
        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ total }),
          });

          const data = await res.json();

          if (data.checkoutUrl) {
            router.push(data.checkoutUrl);
          } else {
            alert("Payment initialization failed.");
            console.error(data);
          }
        } catch (err) {
          alert("Something went wrong.");
          console.error(err);
        }
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <CreditCard className="w-5 h-5" />
        <span className="text-lg">
          {empty ? "empty cart😢" : "Proceed to Checkout"}
        </span>
      </div>
    </button>
  );
};

export default CheckOutButton;
