import { links } from "../Data/SidebarData";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Collapse by default on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4
        transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"} flex-shrink-0`}
    >
      {/* Header - only show on md+ or if not collapsed */}
      <div className="flex flex-col items-center md:items-start mb-8">
        {(!isCollapsed || window.innerWidth >= 768) && (
          <>
            <h1 className="text-2xl font-bold text-red-500">FARM FEEDS</h1>
            <h1 className="text-xl font-bold">MAINTENANCE</h1>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-8">
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

            {/* Show text if expanded or on md+ screens */}
            {!isCollapsed && <span>{item.name}</span>}

            {/* Tooltip only when collapsed on small screens */}
            {isCollapsed && window.innerWidth < 768 && (
              <span
                className="absolute top-full mt-1 px-2 py-1 rounded-md bg-gray-800 text-white text-xs 
                opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center"
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
