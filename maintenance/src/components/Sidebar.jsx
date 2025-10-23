 import { links } from "../Data/SidebarData";
 import { NavLink } from "react-router-dom";
 import { useState, useEffect } from "react";
 import { FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

 export default function Sidebar() {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isMobileOpen, setIsMobileOpen] = useState(false);
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

   // Handle responsive behavior
   useEffect(() => {
     const handleResize = () => setScreenWidth(window.innerWidth);
     window.addEventListener("resize", handleResize);

     if (screenWidth < 450) {
       setIsCollapsed(false); // small screen — full width when open
     } else if (screenWidth >= 450 && screenWidth < 1024) {
       setIsCollapsed(true); // medium screen — collapsible
     } else {
       setIsCollapsed(false); // large screen — expanded
     }

     return () => window.removeEventListener("resize", handleResize);
   }, [screenWidth]);

   const toggleCollapse = () => setIsCollapsed((prev) => !prev);
   const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

   return (
     <>
       {/* 🔹 Sidebar Container */}
       <div
         className={`fixed top-16 left-0 h-[calc(100%-4rem)] 
          bg-gray-900 text-gray-200 flex flex-col p-4 
          transition-all duration-300 z-50
          ${
            screenWidth < 450
              ? isMobileOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full w-64"
              : isCollapsed
              ? "w-20"
              : "w-64"
          }`}
       >
         {/* Header Section */}
         <div className="flex items-center justify-between mb-8">
           {/* Toggle collapse on medium screens */}
           {screenWidth >= 450 && screenWidth < 1024 && (
             <button
               onClick={toggleCollapse}
               className="text-gray-400 hover:text-white transition"
             >
               {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
             </button>
           )}

           {/* Mobile Close Button */}
           {screenWidth < 450 && (
             <button
               onClick={toggleMobileMenu}
               className="text-gray-400 hover:text-white transition"
             >
               {isMobileOpen ? <FiX /> : <FiMenu />}
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
               onClick={() => {
                 // Close sidebar after selecting a link on mobile
                 if (screenWidth < 450) setIsMobileOpen(false);
               }}
             >
               {/* Icon */}
               <span className="text-xl">{item.icon}</span>

               {/* Label */}
               {(!isCollapsed || screenWidth < 450) && (
                 <span className="whitespace-nowrap">{item.name}</span>
               )}

               {/* Tooltip for collapsed medium screens */}
               {isCollapsed && screenWidth >= 450 && (
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

       {/* 🔹 Overlay for small screens */}
       {screenWidth < 450 && isMobileOpen && (
         <div
           className="fixed inset-0 bg-black opacity-50 z-40"
           onClick={() => setIsMobileOpen(false)}
         ></div>
       )}
     </>
   );
 }
