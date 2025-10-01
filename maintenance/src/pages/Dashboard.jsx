import {
  FaClipboardList,
  FaExclamationTriangle,
  FaHourglassHalf,
  FaWrench,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../contexts/Appcontext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { activities } = useContext(AppContext);
  const navigate = useNavigate();

  // derive totals
  const total = activities.length;
  const completed = activities.filter((a) => a.status === "completed").length;
  const ongoing = activities.filter((a) => a.status === "ongoing").length;
  const upcoming = activities.filter((a) => a.status === "upcoming").length;
  const overdue = activities.filter((a) => a.status === "overdue").length;

  const handleNavigate = (status) => {
    if (status === "all") {
      navigate("/work-orders");
    } else {
      navigate(`/work-orders?status=${status}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="w-full">
        <h1 className="font-bold text-2xl">Maintenance Activities Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-2 w-full py-8">
          {/* Total */}
          <div
            onClick={() => handleNavigate("all")}
            className="border border-gray-400 p-4 flex flex-col gap-3 rounded-2xl shadow-xl hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-semibold">Total Maintenance Activities</h1>
              <span className="text-blue-600">
                <FaClipboardList />
              </span>
            </div>
            <p className="text-3xl font-black text-blue-600">{total}</p>
            <p className="text-sm font-light">All Maintenance Records</p>
          </div>

          {/* Completed */}
          <div
            onClick={() => handleNavigate("completed")}
            className="border border-gray-400 p-4 flex flex-col gap-3 rounded-2xl shadow-xl hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-semibold">Completed</h1>
              <span className="text-green-600">
                <FaCircleCheck />
              </span>
            </div>
            <p className="text-3xl font-black text-green-600">{completed}</p>
            <p className="text-sm font-light">Completed Maintenance Records</p>
          </div>

          {/* Ongoing */}
          <div
            onClick={() => handleNavigate("ongoing")}
            className="border border-gray-400 p-4 flex flex-col gap-3 rounded-2xl shadow-xl hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-semibold">Ongoing</h1>
              <span className="text-purple-600">
                <FaWrench />
              </span>
            </div>
            <p className="text-3xl font-black text-purple-600">{ongoing}</p>
            <p className="text-sm font-light">Ongoing Maintenance Records</p>
          </div>

          {/* Upcoming */}
          <div
            onClick={() => handleNavigate("upcoming")}
            className="border border-gray-400 p-4 flex flex-col gap-3 rounded-2xl shadow-xl hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-semibold">Upcoming</h1>
              <span className="text-amber-500">
                <FaHourglassHalf />
              </span>
            </div>
            <p className="text-3xl font-black text-amber-500">{upcoming}</p>
            <p className="text-sm font-light">
              Scheduled maintenance activities
            </p>
          </div>

          {/* Overdue */}
          <div
            onClick={() => handleNavigate("overdue")}
            className="border border-gray-400 p-4 flex flex-col gap-3 rounded-2xl shadow-xl hover:bg-gray-100 hover:cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-semibold">Overdue</h1>
              <span className="text-red-600">
                <FaExclamationTriangle />
              </span>
            </div>
            <p className="text-3xl font-black text-red-600">{overdue}</p>
            <p className="font-light text-sm">Needs attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}
