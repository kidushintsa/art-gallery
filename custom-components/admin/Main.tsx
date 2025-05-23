import React from "react";
import AdminInfoBar from "./AdminInfoBar";
import ProfitBox from "./ProfitBox";

const Main = () => {
  return (
    <div className="flex w-fit mx-auto p-8">
      <AdminInfoBar />
      <section className="flex flex-col h-[60%] justify-around ms-4">
        <ProfitBox
          header="Monthly Net Profit"
          desc="Total profit gained"
          rate="+4.33%"
          amount={900000}
        />
        <ProfitBox
          header="Revenue per visitor"
          desc="Average income per visitors in your website"
          rate="-1.03%"
          amount={900000}
        />
      </section>
    </div>
  );
};

export default Main;
