import {
  Lightbulb,
  LayoutDashboard,
  Copyright,
  Brush,
  Highlighter,
} from "lucide-react";

export const options = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/home",
    tooltip: "Dashboard",
  },
  {
    id: 2,
    name: "Patents",
    icon: <Lightbulb />,
    link: "/patents",
    tooltip: "Filed Patents",
  },
  {
    id: 3,
    name: "Trademarks",
    icon: <Highlighter />,
    link: "/trademarks",
    tooltip: "Filed Trademarks",
  },
  {
    id: 4,
    name: "Designs",
    icon: <Brush />,
    link: "/designs",
    tooltip: "Filed Designs",
  },
  {
    id: 5,
    name: "Copyrights",
    icon: <Copyright />,
    link: "/copyrights",
    tooltip: "Filed Copyrights",
  },
];
