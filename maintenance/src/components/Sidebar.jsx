import { links } from "../Data/SidebarData";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // 🔹 Responsive behavior
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (screenWidth < 450) {
      setIsCollapsed(true); // always collapsed on small screens
    } else if (screenWidth >= 450 && screenWidth < 1024) {
      setIsCollapsed(true); // collapsible medium screens
    } else {
      setIsCollapsed(false); // expanded large screens
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  const toggleCollapse = () => {
    if (screenWidth >= 450 && screenWidth < 1024) {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-gray-900 text-gray-200 
      flex flex-col p-4 transition-all duration-300 z-50
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Toggle button only for medium screens */}
        {screenWidth >= 450 && screenWidth < 1024 && (
          <button
            onClick={toggleCollapse}
            className="text-gray-400 hover:text-white transition"
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {links[0].links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `relative group flex items-center px-3 py-2 rounded-lg transition-colors
              ${isCollapsed ? "justify-center" : "gap-3"}
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-white hover:text-black"
              }`
            }
          >
            {/* Icon */}
            <span className="text-xl">{item.icon}</span>

            {/* Label (hidden when collapsed) */}
            {!isCollapsed && (
              <span className="whitespace-nowrap">{item.name}</span>
            )}

            {/* Tooltip (shows for collapsed sidebar on hover) */}
            {isCollapsed && (
              <span
                className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs 
                opacity-0 group-hover:opacity-100 transition-opacity z-50"
              >
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
