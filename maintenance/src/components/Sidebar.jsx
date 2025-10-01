import { links } from "../Data/SidebarData";
import {NavLink} from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold text-red-500">FARM FEEDS</h1>
        <h1 className="text-xl font-bold mb-2">MAINTENANCE</h1>
      </div>

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
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
