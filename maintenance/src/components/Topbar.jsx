import { FiBell } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Example: you can later get this from context or API
  const notificationCount = 4;

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-gray-900 border-b border-gray-700 p-6 flex flex-row justify-between items-center z-40">
      {/* Left side */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-2xl text-red-600 font-black">FARM FEEDS</h1>
        <h2 className="text-xl text-white font-black">MAINTENANCE</h2>
      </div>

      {/* Right side - Bell + Badge + Tooltip */}
      <Link
        to="/notifications"
        className="relative flex flex-col gap-1 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(!showTooltip)}
      >
        {/* Bell Icon */}
        <FiBell className="text-white text-xl" />

        {/* 🔴 Badge Counter */}
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
            Notifications
          </div>
        )}
      </Link>
    </div>
  );
}
