import { useParams, Link } from "react-router-dom";
import { workOrders } from "../Data/WorkOrdersData";

export default function WorkOrderDetail() {
  const { id } = useParams();
  const workOrder = workOrders.find((wo) => wo.id.toString() === id);

  if (!workOrder) {
    return <div className="p-6">Work order not found.</div>;
  }

  // Helper: format date strings into human-readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr; // fallback if parsing fails
    }
  };

  // Badge styling
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

  return (
    <div className="p-6">
      {/* Back link */}
      <Link
        to="/work-orders"
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Work Orders
      </Link>

      {/* Header */}
      <h1 className="font-bold text-2xl mb-4">Work Order #{workOrder.id}</h1>

      <div className="border p-6 rounded-lg shadow-md bg-white space-y-6">
        {/* Title + Badges */}
        <div>
          <h2 className="text-xl font-bold">{workOrder.title}</h2>
          <div className="flex gap-2 mt-2">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                badgeClasses.priority[workOrder.priority]
              }`}
            >
              Priority: {workOrder.priority}
            </span>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                badgeClasses.status[workOrder.status]
              }`}
            >
              Status: {workOrder.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold italic mb-1">Description</h3>
          <p className="border border-gray-300 rounded p-3">
            {workOrder.description}
          </p>
        </div>

        {/* Equipment & Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold italic mb-1">Machine</h3>
            <p className="border border-gray-300 rounded p-2">
              {workOrder.machine}
            </p>
          </div>
          <div>
            <h3 className="font-semibold italic mb-1">Location</h3>
            <p className="border border-gray-300 rounded p-2">
              {workOrder.location}
            </p>
          </div>
        </div>

        {/* People */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold italic mb-1">Requested By</h3>
            <p className="border border-gray-300 rounded p-2">
              {workOrder.requestedBy}
            </p>
          </div>
          <div>
            <h3 className="font-semibold italic mb-1">Assigned To</h3>
            <p className="border border-gray-300 rounded p-2">
              {workOrder.assignedTo}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold italic mb-1">Created At</h3>
            <p className="border border-gray-300 rounded p-2">
              {formatDate(workOrder.createdAt)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold italic mb-1">Due Date</h3>
            <p className="border border-gray-300 rounded p-2">
              {formatDate(workOrder.dueDate)}
            </p>
          </div>
          {workOrder.completedAt && (
            <div>
              <h3 className="font-semibold italic mb-1">Completed At</h3>
              <p className="border border-gray-300 rounded p-2">
                {formatDate(workOrder.completedAt)}
              </p>
            </div>
          )}
          <div>
            <h3 className="font-semibold italic mb-1">Next Service</h3>
            <p className="border border-gray-300 rounded p-2">
              {formatDate(workOrder.nextServiceDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
