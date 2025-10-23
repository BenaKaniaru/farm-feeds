import {FiHome, FiCalendar, FiClipboard, FiPackage} from "react-icons/fi"

export const links = [
  {
    links: [
      {
        name: "Dashboard",
        icon: <FiHome />,
        to: "/dashboard",
      },
      {
        name: "Maintenance Schedule",
        icon: <FiCalendar />,
        to: "/maintenance-schedule",
      },
      {
        name: "Work Orders",
        icon: <FiClipboard />,
        to: "/work-orders",
      },
      {
        name: "Machine Inventory",
        icon: <FiPackage />,
        to: "/machine-inventory",
      },
    ],
  },
];
