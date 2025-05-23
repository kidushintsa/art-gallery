import React from "react";
import AdminInfoHeader from "./AdminInfoHeader";
import AdminUpdateInfo from "./AdminUpdateInfo";
import { UpdateSectionData } from "@/data/UpdateSectionData";
import UpdateSection from "./UpdateSection";

const AdminInfoBar = () => {
  return (
    <div className="border bg-gray-50 border-gray-200 px-8 py-5">
      <AdminInfoHeader />
      <hr className="my-5" />
      <AdminUpdateInfo header="Update from yesterday">
        {UpdateSectionData.map(({ children, number, subscript }) => (
          <UpdateSection key={subscript} number={number} subscript={subscript}>
            {children}
          </UpdateSection>
        ))}
      </AdminUpdateInfo>
      <hr className="my-5" />

      <AdminUpdateInfo header="Update from last week">
        {UpdateSectionData.map(({ children, number, subscript }) => (
          <UpdateSection key={subscript} number={number} subscript={subscript}>
            {children}
          </UpdateSection>
        ))}
      </AdminUpdateInfo>
      <hr className="my-5" />

      <AdminUpdateInfo header="Update from last month">
        {UpdateSectionData.map(({ children, number, subscript }) => (
          <UpdateSection key={subscript} number={number} subscript={subscript}>
            {children}
          </UpdateSection>
        ))}
      </AdminUpdateInfo>
    </div>
  );
};

export default AdminInfoBar;
