import { useParams, Link } from "react-router-dom";
import { workOrders } from "../Data/WorkOrdersData";

export default function WorkOrderDetail() {
  const { id } = useParams();
  const workOrder = workOrders.find((wo) => wo.id.toString() === id);

  if (!workOrder) {
    return <div className="p-6">Work order not found.</div>;
  }

  // 🔹 Date formatting helper
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "N/A") return "—";
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  // 🔹 Badge styling
  const badgeClasses = {
    priority: {
      low: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-red-100 text-red-700",
    },
    status: {
      completed: "bg-green-100 text-green-700",
      ongoing: "bg-purple-100 text-purple-700",
      upcoming: "bg-amber-100 text-amber-700",
      overdue: "bg-red-100 text-red-700",
    },
  };

  const statusKey = (workOrder.status || "").toLowerCase();
  const priorityKey = (workOrder.priority || "").toLowerCase();

  // 🔹 Keys to exclude from the dynamic display
  const excludeKeys = [
    "id",
    "title",
    "description",
    "createdAt",
    "priority",
    "status",
    "activityType",
  ];

  // 🔹 Convert camelCase / snake_case to readable labels
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/_/g, " ") // replace underscores
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize each word
  };

  return (
    <div className="p-6">
      {/* 🔹 Back link */}
      <Link
        to="/work-orders"
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Work Orders
      </Link>

      {/* 🔹 Header */}
      <h1 className="font-bold text-2xl mb-4">Work Order #{workOrder.id}</h1>

      <div className="border p-6 rounded-lg shadow-md bg-white space-y-6">
        {/* Title + Badges */}
        <div>
          <h2 className="text-xl font-bold">{workOrder.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {workOrder.priority && (
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  badgeClasses.priority[priorityKey] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                Priority: {workOrder.priority}
              </span>
            )}
            {workOrder.status && (
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  badgeClasses.status[statusKey] || "bg-gray-100 text-gray-700"
                }`}
              >
                Status: {workOrder.status}
              </span>
            )}
            {workOrder.activityType && (
              <span className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-800">
                Type: {workOrder.activityType}
              </span>
            )}
          </div>
        </div>

        {/* 🔹 Description */}
        {workOrder.description && (
          <div>
            <h3 className="font-semibold italic mb-1">Description</h3>
            <p className="border border-gray-300 rounded p-3">
              {workOrder.description}
            </p>
          </div>
        )}

        {/* 🔹 Dynamic Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(workOrder)
            .filter(
              ([key, value]) => !excludeKeys.includes(key) && value !== ""
            )
            .map(([key, value]) => (
              <div key={key}>
                <h3 className="font-semibold italic mb-1">
                  {formatLabel(key)}
                </h3>

                {/* Array values (personnel, materials, etc.) */}
                {Array.isArray(value) ? (
                  <ul className="border border-gray-300 rounded p-3 list-disc list-inside">
                    {value.map((v, idx) => (
                      <li key={idx}>{v}</li>
                    ))}
                  </ul>
                ) : (
                  // Handle date-like fields
                  <p className="border border-gray-300 rounded p-2">
                    {key.toLowerCase().includes("date") ||
                    key.toLowerCase().includes("on")
                      ? formatDate(value)
                      : value}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
