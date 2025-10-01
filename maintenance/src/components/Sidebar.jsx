import { useState } from "react";
import { links } from "../Data/SidebarData";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // menu icon

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4 transition-all duration-300`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between mb-8">
        {isExpanded && (
          <div>
            <h1 className="text-2xl font-bold text-red-500">FARM FEEDS</h1>
            <h1 className="text-xl font-bold">MAINTENANCE</h1>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-200 hover:text-white"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {links[0].links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-white hover:text-black"
              }`
            }
          >
            {item.icon}
            {isExpanded && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
