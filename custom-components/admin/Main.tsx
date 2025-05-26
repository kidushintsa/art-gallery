import React from "react";
import AdminInfoBar from "./AdminInfoBar";
import ProfitBox from "./ProfitBox";
import TopProductTable from "./TopProductTable";
import Receipt from "./Receipt";

const Main = () => {
  return (
    <div className="block p-8 mx-auto">
      <div className="flex w-fit">
        <AdminInfoBar />
        <section className="flex flex-col justify-around ms-4 ">
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
      <TopProductTable />
      <Receipt />
    </div>
  );
};

export default Main;
