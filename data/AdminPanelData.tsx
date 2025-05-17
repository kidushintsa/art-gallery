import { Navlink } from "@/entities/Navlink";
import {
  Bell,
  BookOpenText,
  Box,
  Calendar,
  ChartNoAxesCombined,
  FolderKanban,
  Mail,
  MessageCircleQuestion,
  MessageSquare,
  PhoneCall,
  PlaneLanding,
  ShieldHalf,
  ShoppingBasket,
  ShoppingCart,
  SquareUser,
  Tag,
  Target,
  TriangleAlert,
  UserCog,
} from "lucide-react";

export const HomePanelData: Navlink[] = [
  {
    name: "Shopped",
    href: "",
    children: <ShoppingCart />,
  },
  {
    name: "Project",
    href: "",
    children: <FolderKanban />,
  },
  {
    name: "CRM",
    href: "",
    children: <PhoneCall />,
  },
  {
    name: "analytics",
    href: "",
    children: <ChartNoAxesCombined />,
  },
  {
    name: "HRM",
    href: "",
    children: <UserCog />,
  },
];

export const AppsPanelData: Navlink[] = [
  {
    name: "E-commmerce",
    href: "",
    children: <ShoppingBasket />,
  },
  {
    name: "Email",
    href: "",
    children: <Mail />,
  },
  {
    name: "chat",
    href: "",
    children: <MessageSquare />,
  },
];

export const PagesPanelData: Navlink[] = [
  {
    name: "Starter",
    href: "",
    children: <Target />,
  },
  {
    name: "Notifications",
    href: "",
    children: <Bell />,
  },
  {
    name: "Events",
    href: "",
    children: <Calendar />,
  },
  {
    name: "Authentication",
    href: "",
    children: <ShieldHalf />,
  },
  {
    name: "Error 404",
    href: "",
    children: <TriangleAlert />,
  },
];

export const MiscPanelData: Navlink[] = [
  {
    name: "Landing",
    href: "",
    children: <PlaneLanding />,
  },
  {
    name: "Account",
    href: "",
    children: <SquareUser />,
  },
  {
    name: "Pricing",
    href: "",
    children: <Tag />,
  },
  {
    name: "FAQ",
    href: "",
    children: <MessageCircleQuestion />,
  },
];

export const DocsPanelData: Navlink[] = [
  {
    name: "Guid",
    href: "",
    children: <BookOpenText />,
  },
  {
    name: "Components",
    href: "",
    children: <Box />,
  },
];
