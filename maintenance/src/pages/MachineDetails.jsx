import { useParams, useNavigate } from "react-router-dom";
import { machines } from "../Data/MachineInventoryData";
import { FiArrowLeft } from "react-icons/fi";

export default function MachineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const machine = machines.find((m) => m.id === parseInt(id));

  if (!machine) {
    return (
      <div className="p-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-green-600 mb-4 hover:underline"
        >
          <FiArrowLeft /> Back to Inventory
        </button>
        <p className="text-gray-600 italic">Machine not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate("/machines")}
        className="flex items-center gap-2 text-green-600 mb-6 hover:underline"
      >
        <FiArrowLeft /> Back to Inventory
      </button>

      {/* Machine Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">{machine.name}</h1>
            <p className="text-sm opacity-90">{machine.code}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span
              className={`px-3 py-1 rounded-full font-medium bg-white/20 backdrop-blur-sm ${
                machine.status === "Operational"
                  ? "text-green-200 border border-green-200"
                  : machine.status === "Under Maintenance"
                  ? "text-yellow-200 border border-yellow-200"
                  : "text-red-200 border border-red-200"
              }`}
            >
              {machine.status}
            </span>
            <span className="px-3 py-1 bg-white/20 text-blue-100 rounded-full font-medium border border-blue-100">
              {machine.condition}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">
          Technical Specifications
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 text-gray-700 text-sm">
          <Spec label="Category" value={machine.category} />
          <Spec label="Location" value={machine.location} />
          <Spec label="Manufacturer" value={machine.manufacturer} />
          <Spec label="Model" value={machine.model} />
          <Spec label="Power Rating" value={machine.powerRating} />
          <Spec label="Voltage" value={machine.voltage} />
          <Spec label="Current" value={machine.current} />
          <Spec label="Frequency" value={machine.frequency} />
          <Spec label="Speed (RPM)" value={machine.rpm} />
          <Spec label="Installed Date" value={machine.installedDate} />
          <Spec label="Last Serviced" value={machine.lastServiced} />
          <Spec label="Next Service Due" value={machine.nextServiceDue} />
        </div>
      </div>

      {/* Accessories Section */}
      <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">
          Accessories / Attachments
        </h2>

        {machine.accessories.length > 0 ? (
          <ul className="space-y-4">
            {machine.accessories.map((acc, i) => (
              <li
                key={i}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow transition-all"
              >
                <p className="font-semibold text-green-700">{acc.name}</p>
                <div className="mt-1 text-sm text-gray-600 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                  {Object.entries(acc)
                    .filter(([key]) => key !== "name")
                    .map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium capitalize">{key}:</span>{" "}
                        {value}
                      </p>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No accessories listed.</p>
        )}
      </div>
    </div>
  );
}

/* Helper Component for key-value specs */
function Spec({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
        {label}
      </span>
      <span className="font-medium text-gray-800">{value || "—"}</span>
    </div>
  );
}
