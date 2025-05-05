import Link from "next/link";
import React from "react";

const CusNavLink = ({ linkName, href }: { linkName: string; href: string }) => {
  return <Link href={href}>{linkName}</Link>;
};

export default CusNavLink;
