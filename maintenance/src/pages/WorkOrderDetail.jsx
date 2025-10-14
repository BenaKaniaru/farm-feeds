import { useParams, Link } from "react-router-dom";
import { workOrders } from "../Data/WorkOrdersData";

export default function WorkOrderDetail() {
  const { id } = useParams();
  const workOrder = workOrders.find((wo) => wo.id.toString() === id);

  if (!workOrder) {
    return <div className="p-6">Work order not found.</div>;
  }

  // Format date helper
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

  // Conditional fields per status
  let fields = [];

  if (statusKey === "ongoing") {
    fields = [
      { key: "projectLead", label: "Project Lead" },
      { key: "assignedPersonnel", label: "Assigned Personnel" },
      { key: "startedOn", label: "Started On", isDate: true },
      {
        key: "expectedCompletionDate",
        label: "Expected Completion",
        isDate: true,
      },
      { key: "statusReport", label: "Status Report" },
    ];
  } else if (statusKey === "upcoming") {
    fields = [
      { key: "projectLead", label: "Project Lead" },
      { key: "assignedPersonnel", label: "Assigned Personnel" },
      { key: "scheduledStartDate", label: "Scheduled Start", isDate: true },
      { key: "workDaysExpected", label: "Work Duration" },
      { key: "numberOfPersonellRequired", label: "Personnel Required" },
      { key: "requiredMaterials", label: "Required Materials" },
      { key: "statusReport", label: "Status Report" },
    ];
  } else {
    // Default fallback for completed or other statuses
    fields = [
      { key: "machine", label: "Machine" },
      { key: "location", label: "Location" },
      { key: "activityType", label: "Activity Type" },
      { key: "projectLead", label: "Project Lead" },
      { key: "attendedby", label: "Attended By" },
      { key: "startedon", label: "Started On", isDate: true },
      { key: "dueDate", label: "Due Date", isDate: true },
      { key: "completedon", label: "Completed On", isDate: true },
      { key: "nextServiceDate", label: "Next Service", isDate: true },
    ];
  }

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

        {/* Description */}
        {workOrder.description && (
          <div>
            <h3 className="font-semibold italic mb-1">Description</h3>
            <p className="border border-gray-300 rounded p-3">
              {workOrder.description}
            </p>
          </div>
        )}

        {/* Dynamic Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((field) => {
            const value = workOrder[field.key];

            if (value === undefined || value === null || value === "")
              return null;

            return (
              <div key={field.key}>
                <h3 className="font-semibold italic mb-1">{field.label}</h3>

                {/* Render Ordered List for Assigned Personnel */}
                {field.key === "assignedPersonnel" && Array.isArray(value) ? (
                  <ol className="border border-gray-300 rounded p-3 list-decimal list-inside">
                    {value.map((person, idx) => (
                      <li key={idx}>{person}</li>
                    ))}
                  </ol>
                ) : /* Render Unordered List for Required Materials */ field.key ===
                    "requiredMaterials" && Array.isArray(value) ? (
                  <ul className="border border-gray-300 rounded p-3 list-disc list-inside">
                    {value.map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="border border-gray-300 rounded p-2">
                    {field.isDate ? formatDate(value) : value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
