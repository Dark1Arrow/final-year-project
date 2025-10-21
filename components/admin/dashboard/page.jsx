"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload, FiCreditCard } from "react-icons/fi";
import { API_BASE_URL } from "@/app/api/constants";

const WalletDashboard = () => {
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/wallet/all`, {
          withCredentials: true,
        });
        console.log(res.data)
        setWalletData(res.data.data || []);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading wallets...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Top Section */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="bg-blue-500 rounded-lg shadow-xl p-8 text-center">
          <p className="text-white text-lg font-medium mb-6">
            The Cirrus Core Wallet allows you to send, receive, and interact with Smart Contracts
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition duration-150 shadow-md"
              onClick={() => console.log("Download clicked")}
            >
              <FiDownload className="text-xl" />
              <span>Download</span>
            </button>

            <button
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
              onClick={() => console.log("Wallet Details clicked")}
            >
              <FiCreditCard className="text-xl" />
              <span>Wallet Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Table */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Wallet Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Wallet Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Account Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">User</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {walletData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.walletName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{item.walletAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
