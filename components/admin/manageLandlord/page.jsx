"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../app/api/constants";
import axios from "axios";

const LandlordTable = () => {
  const [landlordData, setLandlordData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all landlords
  const fetchLandlords = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/users/landlord`, {
        withCredentials: true,
      }); // 👈 your backend should return all landlords
      setLandlordData(res.data.data);
    } catch (error) {
      console.error("Error fetching landlords:", error);
    }
  };

  // Change landlord status (active/inactive)
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/v1/users/landlord/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      setLandlordData((prev) =>
        prev.map((landlord) =>
          landlord._id === id ? { ...landlord, status: newStatus } : landlord
        )
      );
    } catch (error) {
      console.error("Error updating landlord status:", error);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchLandlords();
  }, []);

  // Filter by ID or username
  const filteredData = landlordData.filter(
    (landlord) =>
      landlord._id.includes(searchTerm) ||
      landlord.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto flex justify-end mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by id / name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Landlord ID
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Mobile
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Address
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item._id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.username}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.phone}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.address}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() =>
                        handleStatusChange(item._id, item.status)
                      }
                      className={` capitalize px-4 py-1 rounded-full text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandlordTable;
