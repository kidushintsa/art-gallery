import { ReactNode } from "react";

export interface Navlink {
  name: string;
  href: string;
  children: ReactNode;
}
