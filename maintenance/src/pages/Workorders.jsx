import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function Workorders() {
  const navigate = useNavigate();
  const { activities } = useAppContext();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("status") || "all";

  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Update query string when status changes
  const updateFilter = (value) => {
    setStatusFilter(value);
    const params = new URLSearchParams(location.search);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  // 🔹 Format relative dates
  const formatRelativeDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = date - now;
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (Math.abs(diffInDays) < 7) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(diffInDays, "day");
    }

    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // 🔹 Apply filtering, searching, sorting
  const filteredOrders = useMemo(() => {
    return activities
      .filter((wo) => {
        if (
          statusFilter !== "all" &&
          wo.status.toLowerCase() !== statusFilter.toLowerCase()
        )
          return false;
        const q = searchQuery.toLowerCase();
        return (
          wo.title.toLowerCase().includes(q) ||
          wo.machine.toLowerCase().includes(q) ||
          wo.location.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "latest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
  }, [statusFilter, searchQuery, sortOrder, activities]);

  // 🔹 Status color codes
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "ongoing":
        return "text-orange-500";
      case "overdue":
        return "text-red-600";
      case "upcoming":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  // 🔹 Date selection logic
  const getDateInfo = (wo) => {
    let label = "Created At";
    let value = wo.createdAt;
    let extraClass = "";

    if (wo.status.toLowerCase() === "completed") {
      if (
        wo.activityType?.toLowerCase().includes("corrective") ||
        wo.activityType?.toLowerCase().includes("preventive")
      ) {
        label = "Completion Date";
        value = wo.completedon;
      } else if (wo.activityType?.toLowerCase().includes("routine")) {
        label = "Next Service/Inspection";
        value = wo.nextServiceDate;
      }
    } else if (wo.status.toLowerCase() === "upcoming") {
      label = "Scheduled Date";
      value = wo.dueDate;
    } else if (wo.status.toLowerCase() === "overdue") {
      label = "⚠️ Overdue";
      value = wo.dueDate;
      extraClass = "text-red-600 font-bold";
    }

    return { label, value, extraClass };
  };

  const handleOrderClick = (id) => {
    navigate(`/work-orders/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Work Orders</h2>

      {/* Filter, Sort & Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => updateFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="all">All Orders</option>
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <input
          type="text"
          placeholder="Search by title, machine, or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:flex-1"
        />
      </div>

      {/* 📱 Mobile View (Cards) */}
      <div className="space-y-4 md:hidden">
        {filteredOrders.length === 0 ? (
          <p>No work orders found.</p>
        ) : (
          filteredOrders.map((wo) => {
            const { label, value, extraClass } = getDateInfo(wo);

            return (
              <div
                key={wo.id}
                onClick={() => handleOrderClick(wo.id)}
                className="border rounded p-4 shadow hover:bg-gray-100 cursor-pointer"
              >
                <h2 className="font-bold text-lg">{wo.title}</h2>
                <p className="text-sm text-gray-600">
                  {wo.machine} • {wo.location}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${getStatusClass(wo.status)}`}
                  >
                    {wo.status}
                  </span>
                </p>
                <p className={`text-xs mt-1 ${extraClass}`}>
                  {label}: {formatRelativeDate(value)}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* 💻 Desktop View (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Machine</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Activity Type</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No work orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((wo, index) => {
                const { label, value, extraClass } = getDateInfo(wo);

                return (
                  <tr
                    key={wo.id}
                    onClick={() => handleOrderClick(wo.id)}
                    className={`hover:bg-gray-50 hover:cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2">{wo.id}</td>
                    <td className="px-4 py-2 font-medium">{wo.title}</td>
                    <td className="px-4 py-2">{wo.machine}</td>
                    <td className="px-4 py-2">{wo.location}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${getStatusClass(
                        wo.status
                      )}`}
                    >
                      {wo.status}
                    </td>
                    <td className="px-4 py-2">{wo.activityType}</td>
                    <td className={`px-4 py-2 ${extraClass}`}>
                      {label}: {formatRelativeDate(value)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
