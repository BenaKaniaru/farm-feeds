import { useState } from "react";
import { Bell, AlertCircle, CheckCircle, Wrench, Clock } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Machine #4 Due for Maintenance",
      message: "The hammer mill requires preventive maintenance by tomorrow.",
      type: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Work Order #12 Completed",
      message: "Lubrication task on the feed mixer was marked as complete.",
      type: "success",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Overdue Maintenance Task",
      message:
        "The pellet mill inspection task is overdue by 2 days. Please review.",
      type: "danger",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "New Work Order Assigned",
      message: "You have been assigned a new task on the cooling system.",
      type: "info",
      time: "3 days ago",
    },
  ]);

  const iconMap = {
    info: <Bell className="text-blue-600" size={22} />,
    warning: <AlertCircle className="text-amber-500" size={22} />,
    danger: <AlertCircle className="text-red-600" size={22} />,
    success: <CheckCircle className="text-green-600" size={22} />,
    maintenance: <Wrench className="text-slate-600" size={22} />,
  };

  const badgeColor = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-blue-600" /> Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center mt-10">
          No new notifications.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Left side: icon + text */}
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-gray-50 rounded-full">
                  {iconMap[note.type] || <Bell className="text-gray-600" />}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{note.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{note.message}</p>
                  <span
                    className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                      badgeColor[note.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                  </span>
                </div>
              </div>

              {/* Right side: timestamp */}
              <div className="mt-3 md:mt-0 flex items-center text-gray-500 text-sm gap-1">
                <Clock size={16} />
                {note.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
