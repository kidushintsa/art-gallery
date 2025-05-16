import { AdminNavlink } from "@/entities/adminNavlink";
import {
  ArrowLeftRight,
  EllipsisVertical,
  House,
  Layers,
  Palette,
  Percent,
  Settings,
} from "lucide-react";

export const NavLinkData: AdminNavlink[] = [
  {
    name: "Home",
    href: "",
    children: <House />,
  },
  {
    name: "artist",
    href: "",
    children: <Palette />,
  },
  {
    name: "transaction",
    href: "",
    children: <ArrowLeftRight />,
  },
  {
    name: "analytics",
    href: "",
    children: <Percent />,
  },
  {
    name: "Projects",
    href: "",
    children: <Layers />,
  },
  {
    name: "Setting",
    href: "",
    children: <Settings />,
  },
  {
    name: "more",
    href: "",
    children: <EllipsisVertical />,
  },
];
