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
        onClick={() => navigate("/machine-inventory")}
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
          <Spec label="Year of Manufacture" value={machine.manufactureYear} />
          <Spec label="Service Frequency" value={machine.serviceFrequency} />
          <Spec label="Service Type" value={machine.serviceType} />
        </div>
      </div>

      {/* Accessories Section */}
      <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Accessories / Attachments
        </h2>

        {machine.accessories && machine.accessories.length > 0 ? (
          <div className="flex flex-col gap-6">
            {machine.accessories.map((acc, i) => (
              <div
                key={i}
                className="flex flex-col bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-6"
              >
                {/* Accessory Header */}
                <div className="border-b border-gray-200 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-green-700">
                    {acc.name}
                  </h3>
                  {acc.type && (
                    <p className="text-xs text-gray-500 italic">{acc.type}</p>
                  )}
                </div>

                {/* Accessory Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm text-gray-700">
                  {Object.entries(acc)
                    .filter(([key]) => key !== "name" && key !== "type")
                    .map(([key, value]) => {
                      const isNumeric =
                        typeof value === "number" ||
                        /^\d+(\.\d+)?$/.test(value);
                      return (
                        <div
                          key={key}
                          className="flex flex-col bg-gray-50 rounded-lg p-3 border border-gray-100"
                        >
                          <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">
                            {formatLabel(key)}
                          </span>
                          <span
                            className={`font-medium text-gray-800 ${
                              isNumeric ? "text-right" : "text-left"
                            }`}
                          >
                            {value || "—"}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
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

/* Helper function to format object keys into readable labels */
function formatLabel(key) {
  const abbreviations = ["id", "rpm", "hp", "kw", "ph"];
  if (abbreviations.includes(key.toLowerCase())) {
    return key.toUpperCase();
  }
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
}
