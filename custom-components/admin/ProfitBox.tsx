import React from "react";

interface ProfitBox {
  header: string;
  desc: string;
  amount: number;
  rate: string;
}

const ProfitBox = ({ header, desc, amount, rate }: ProfitBox) => {
  return (
    <div className="border p-5 h-fit bg-gray-200">
      <header className="">
        <h1 className="text-xl font-semibold">{header}</h1>
        <p className="font-extralight text-gray-500 text-sm">{desc}</p>
      </header>
      <section className="mt-3">
        <h2 className="font-bold text-2xl">{amount}</h2>
        <p className="font-extralight text-gray-500 text-sm mt-2">
          <span className="p-1 rounded-2xl bg-green-200 text-green-600 me-1">
            {rate}
          </span>
          vs last month
        </p>
      </section>
    </div>
  );
};

export default ProfitBox;
