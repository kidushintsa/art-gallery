// import ArtCard from "@/custom-components/ArtCard";

import CusNavLink from "@/custom-components/CusNavLink";
import UserSearchBox from "@/custom-components/UserSearchBox";
import { CircleUserRound, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex border items-center">
      <div className="border">
        <CusNavLink linkName="Home" href="Dashboard" />
        <CusNavLink linkName="About Us" href="Dashboard" />
      </div>
      <UserSearchBox />
      <div className="border p-1 flex">
        <ShoppingBag size={28} strokeWidth={1.75} className="border" />
        <CircleUserRound size={28} strokeWidth={1.75} className="border" />
      </div>
    </div>
  );
}
