import { Eye, Palette } from "lucide-react";

export const roles = [
  {
    id: "artist",
    title: "Artist",
    description: "Showcase and sell your artwork to collectors worldwide",
    icon: Palette,
    features: [
      "Upload artwork",
      "Set prices",
      "Receive payments",
      "Artist profile",
    ],
    badge: "Earn Money",
  },
  {
    id: "customer",
    title: "Art Collector",
    description: "Discover and purchase unique pieces from talented artists",
    icon: Eye,
    features: [
      "Browse gallery",
      "Purchase artwork",
      "Collection management",
      "Artist following",
    ],
    badge: "Discover Art",
  },
];
