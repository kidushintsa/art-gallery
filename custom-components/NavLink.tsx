"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ linkName, href }: { linkName: string; href: string }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={clsx("px-3 py-2", {
        "font-bold": isActive,
      })}
      href={href}
    >
      {linkName}
    </Link>
  );
};

export default NavLink;
