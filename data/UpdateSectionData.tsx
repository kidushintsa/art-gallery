import { UpdateSection } from "@/custom-components/admin/UpdateSection";
import { BanknoteArrowUp, ShoppingCart, Telescope } from "lucide-react";

export const UpdateSectionData: UpdateSection[] = [
  {
    children: <Telescope />,
    number: "2100",
    subscript: "Visitors",
  },
  {
    children: <BanknoteArrowUp />,
    number: "100,00 ETB",
    subscript: "Earning",
  },
  {
    children: <ShoppingCart />,
    number: "23",
    subscript: "orders",
  },
];
