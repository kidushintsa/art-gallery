"use client";
import { ReactNode } from "react";
import AuthProvider from "../authProvider";

const layout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default layout;
