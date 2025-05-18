import React, { ReactNode } from "react";
export interface UpdateSection {
  children: ReactNode;
  number: string;
  subscript: string;
}
const UpdateSection = ({ children, number, subscript }: UpdateSection) => {
  return (
    <div className="flex items-center py-3">
      <section className="border p-1 rounded-[16px] bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-cyan-50">
        {children}
      </section>
      <section className="ms-3 font-bold text-2xl">
        {number}
        <sub className="font-light text-sm ms-1 text-black">{subscript}</sub>
      </section>
    </div>
  );
};

export default UpdateSection;
