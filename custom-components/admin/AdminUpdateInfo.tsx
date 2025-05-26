import React, { ReactNode } from "react";

const AdminUpdateInfo = ({
  header,
  children,
}: {
  header: string;
  children: ReactNode[];
}) => {
  return (
    <div className="">
      <h1 className="font-extralight text-gray-500 text-sm pb-4">{header}</h1>
      {/* {UpdateSectionData.map(({ children, number, subscript }) => (
        <UpdateSection key={subscript} number={number} subscript={subscript}>
          {children}
        </UpdateSection>
      ))} */}
      {children}
    </div>
  );
};

export default AdminUpdateInfo;
