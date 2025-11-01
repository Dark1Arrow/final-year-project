"use client";
import { useState } from "react";
import axios from "axios";
import { process.env.NEXT_PUBLIC_API_URL } from "";

const SignUpCard = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    phone: "",
    address: "",
    role: "landlord", // 👈 default role
  });

  // 👇 handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 👇 handle role selection
  const handleRoleChange = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  };

  // 👇 handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register user
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const user = response.data?.data; // ✅ Correct structure

      // Create wallet for the new user
      const walletResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wallet/create`,
        {
          userId: user._id, // ✅ Correct property
          walletName: "My Rental Wallet",
          accountName: user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data, "Signup response");
      console.log(walletResponse.data, "Wallet created successfully");
      alert("Signup successful!");

    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.status === 409) {
        alert("User already exists! Please login instead.");
      } else {
        alert(error.response?.data?.message || "Something went wrong!");
      }
    }
  };


  return (
    <>
      <div className="absolute top-5 left-10 font-bold text-lg text-gray-800">
        LOGO
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-24">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 sm:p-10">
          {/* 👇 Role selector */}
          <div className="flex border-b border-gray-200 mb-8">
            <div
              onClick={() => handleRoleChange("landlord")}
              className={`pb-3 px-4 font-semibold cursor-pointer ${formData.role === "landlord"
                ? "text-gray-800 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Landlord
            </div>
            <div
              onClick={() => handleRoleChange("tenant")}
              className={`pb-3 px-4 font-semibold cursor-pointer ${formData.role === "tenant"
                ? "text-gray-800 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Tenant
            </div>
          </div>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-150"
            >
              Sign up &gt;
            </button>
          </form>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          You already have an account? Then just
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
            Log in
          </a>
        </div>
      </div>
    </>
  );
};

export default SignUpCard;
