"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";


const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user and wallet info on load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1️⃣ Fetch logged-in user data
        const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/userData`, {
          withCredentials: true,
        });

        const user = userRes.data.data;
        setUserData(user);

        // 2️⃣ Fetch wallet data using user ID
        const walletRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallet/user/${user._id}`,
          { withCredentials: true }
        );
        setWalletData(walletRes.data.data);
      } catch (error) {
        console.error("Error fetching user or wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Check balance function
  const handleCheckBalance = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallet/balance/${walletData._id}`,
        { withCredentials: true }
      );
      alert(`Your balance: ₹${res.data.data.balance}`);
    } catch (error) {
      console.error("Error checking balance:", error);
      alert("Unable to fetch wallet balance");
    }
  };

  // ✅ Reusable card component
  const DetailCard = ({ title, details, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
        {title}
      </h2>

      {details &&
        Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex text-gray-700 py-1.5 text-base">
            <span className="font-medium min-w-[120px] capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span className="ml-4 font-normal flex-1">{value}</span>
          </div>
        ))}
      {children}
    </div>
  );

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (!userData)
    return <p className="text-center text-red-500">Failed to load data</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
        Welcome ! <span className="text-blue-600">{userData.username}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <DetailCard
          title="Personnel Details"
          details={{
            id: userData._id,
            email: userData.email,
            role: userData.role,
            status: userData.status || "Pending",
          }}
        />

        <DetailCard
          title="Cirrus Wallet Details"
          details={{
            walletName: walletData?.walletName,
            walletAddress: walletData?._id,
            accountName: walletData?.accountName,
          }}
        >
          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleCheckBalance}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Check Balance
            </button>
          </div>
        </DetailCard>
      </div>
    </div>
  );
};

export default UserDashboard;
