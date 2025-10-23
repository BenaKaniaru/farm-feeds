import { useState } from "react";
import { machines } from "../Data/MachineInventoryData";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function MachineInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      machine.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">
          Machine Inventory
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, code or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full md:w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="Operational">Operational</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Down">Down</option>
          </select>
        </div>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block bg-white shadow-md rounded-2xl overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Power</th>
              <th className="px-4 py-3">Last Serviced</th>
            </tr>
          </thead>
          <tbody>
            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine) => (
                <tr
                  key={machine.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Put a Link inside each td so the table layout stays intact */}
                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.code}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full font-medium text-green-700"
                    >
                      {machine.name}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.category}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.location}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className={`block w-full h-full font-medium ${
                        machine.status === "Operational"
                          ? "text-green-600"
                          : machine.status === "Under Maintenance"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {machine.status}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.condition}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.powerRating}
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/machines/${machine.id}`}
                      className="block w-full h-full"
                    >
                      {machine.lastServiced}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No machines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (Mobile) */}
      <div className="grid md:hidden gap-4">
        {filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <Link
              key={machine.id}
              to={`/machines/${machine.id}`}
              className="block bg-white rounded-2xl shadow-md p-4 border-l-4 border-green-500 hover:bg-gray-50 transition"
            >
              <h2 className="font-semibold text-green-700">{machine.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{machine.code}</p>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-700">
                <p>
                  <strong>Category:</strong> {machine.category}
                </p>
                <p>
                  <strong>Location:</strong> {machine.location}
                </p>
                <p>
                  <strong>Status:</strong> {machine.status}
                </p>
                <p>
                  <strong>Condition:</strong> {machine.condition}
                </p>
                <p>
                  <strong>Power:</strong> {machine.powerRating}
                </p>
                <p>
                  <strong>Last Serviced:</strong> {machine.lastServiced}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No machines found.</p>
        )}
      </div>
    </div>
  );
}
