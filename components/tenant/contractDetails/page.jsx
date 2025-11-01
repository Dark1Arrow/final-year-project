"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Eye,
  Download,
  Check,
  Clock,
  DollarSign,
  Home,
  X,
  User,
  Calendar,
  MapPin,
  FileText,
  Shield,
  ClipboardList,
} from "lucide-react";


// ✅ Status badge helper
const getStatusBadge = (status) => {
  const colors = {
    active: "bg-teal-100 text-teal-800",
    pending: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// ✅ Confirm Button
const ConfirmButton = ({ contractId, status, refreshContracts }) => {
  const handleClick = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/booking/confirm/${contractId}`,
        {},
        { withCredentials: true }
      );
      alert("Contract confirmed successfully!");
      refreshContracts();
    } catch (err) {
      console.error("Error confirming contract:", err);
      alert("Error confirming contract");
    }
  };

  const isDisabled = status !== "pending";

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition duration-300 ${
        isDisabled
          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600 shadow-md"
      }`}
    >
      <Check className="w-4 h-4" /> Confirm
    </button>
  );
};

// ✅ View & Download Buttons
const ContractActions = ({ contract, handleView, handleDownload }) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={() => handleView(contract)}
      aria-label="View Contract"
      className="p-2 rounded-full text-blue-600 hover:bg-blue-100"
    >
      <Eye className="w-5 h-5" />
    </button>
    <button
      onClick={() => handleDownload(contract._id)}
      aria-label="Download Contract"
      className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
    >
      <Download className="w-5 h-5" />
    </button>
  </div>
);

// ✅ Detail Card Modal (Full Property Info)
const DetailCard = ({ contract, onClose }) => {
  if (!contract) return null;

  const property = contract.property || {};

  return (
    <div className="fixed pt-20 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Home className="w-6 h-6 mr-2 text-blue-600" />
          Contract Details
        </h2>

        {/* Contract Info */}
        <div className="space-y-5 text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Contract ID:</p>
              <p>{contract._id}</p>
            </div>
            <div>
              <p className="font-semibold flex items-center gap-1">
                <User className="w-4 h-4" /> Tenant:
              </p>
              <p>{contract.user?.name || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Start Date:
              </p>
              <p>{contract.startDate?.slice(0, 10)}</p>
            </div>

            <div>
              <p className="font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" /> End Date:
              </p>
              <p>{contract.endDate?.slice(0, 10)}</p>
            </div>

            <div>
              <p className="font-semibold">Status:</p>
              {getStatusBadge(contract.status)}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-4"></div>

          {/* Property Info */}
          <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
            <FileText className="w-5 h-5" /> Property Information
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{property.name || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold">Type:</p>
              <p className="capitalize">{property.type || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold">City:</p>
              <p>{property.city || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Address:
              </p>
              <p>{property.address || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> Rent Price:
              </p>
              <p>₹{property.rentPrice || 0}</p>
            </div>

            <div>
              <p className="font-semibold flex items-center gap-1">
                <Shield className="w-4 h-4" /> Security Deposit:
              </p>
              <p>₹{property.securityDeposit || 0}</p>
            </div>

            <div className="col-span-2">
              <p className="font-semibold flex items-center gap-1">
                <ClipboardList className="w-4 h-4" /> Rules:
              </p>
              <p>{property.rules || "No specific rules"}</p>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">Description:</p>
              <p className="text-gray-600 leading-relaxed">
                {property.description || "No description available"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Main App Component
const App = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  const fetchContracts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/booking/getAll`, {
        withCredentials: true,
      });

      // Fetch property details for each booking
      const contractsWithProperty = await Promise.all(
        res.data.data.map(async (booking) => {
          const propRes = await axios.get(
            `${API_BASE_URL}/api/v1/property/get/${booking.property}`,
            { withCredentials: true }
          );
          return { ...booking, property: propRes.data.data };
        })
      );

      setContracts(contractsWithProperty);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleView = (contract) => setSelectedContract(contract);
  const handleDownload = (id) => console.log("Download contract", id);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Contract Management
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Contract ID",
                  "Property",
                  "Type",
                  "Rent",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {contracts.map((contract) => (
                <tr key={contract._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{contract._id}</td>
                  <td className="px-6 py-4 text-sm">
                    {contract.property?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {contract.property?.type || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    ₹{contract.property?.rentPrice || 0}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {contract.startDate?.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {contract.endDate?.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(contract.status)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {contract.status === "pending" ? (
                      <ConfirmButton
                        contractId={contract._id}
                        status={contract.status}
                        refreshContracts={fetchContracts}
                      />
                    ) : (
                      <ContractActions
                        contract={contract}
                        handleView={handleView}
                        handleDownload={handleDownload}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Card */}
        {selectedContract && (
          <DetailCard
            contract={selectedContract}
            onClose={() => setSelectedContract(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
