"use client";
import { useState } from "react";
import axios from "axios";

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
        <div className="absolute top-4 left-4" >
        <a href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="40"
            height="40"
          >
            <g id="HomeVerse">
              <path fill="#42a5f5" d="M26 16a2 2 0 0 0-4 0v1h4z" />
              <path
                fill="#42a5f5"
                d="m33 16 4-6-1.65-4.13A35.45 35.45 0 0 0 9.27 7.2l2.85 1.71 2.56-.86a1 1 0 0 1 .64 1.9l-2.48.82-.73 2.92 1.6 1.6a1 1 0 0 1-1.42 1.42c-2.07-2.07-2.45-2.24-2.26-3l.82-3.28L8 8.77v12.31a24 24 0 0 0 7.05 17.12l3.19-1.91.87-1.74a1 1 0 0 1 1.78.9l-.58 1.17 4.2 2.52A1 1 0 0 1 24 41c-.38 0-.2 0-5-2.83l-2.4 1.44a24.2 24.2 0 0 0 7 4.1 1.05 1.05 0 0 0 .7 0A24 24 0 0 0 40 21.08V12.5zm-1 7a1 1 0 0 1 0 2h-2a10.53 10.53 0 0 1-.09 2H32a1 1 0 0 1 0 2h-2.81a6 6 0 0 1-10.38 0H16a1 1 0 0 1 0-2h2.09a10.53 10.53 0 0 1-.09-2h-2a1 1 0 0 1 0-2h2v-2h-2a1 1 0 0 1 0-2h2.18A3 3 0 0 1 20 17.18c0-1.36-.13-2.56 1.05-3.85l-.94-1.88a1 1 0 0 1 1.78-.9l.84 1.68a3.58 3.58 0 0 1 2.54 0l.83-1.68a1 1 0 0 1 1.79.9L27 13.33c1.2 1.31 1.05 2.59 1.05 3.85A3 3 0 0 1 29.82 19H32a1 1 0 0 1 0 2h-2v2z"
              />
              <path
                fill="#42a5f5"
                d="M20 20v6a4 4 0 0 0 3 3.86V19h-2a1 1 0 0 0-1 1zM27 19h-2v10.86A4 4 0 0 0 28 26v-6a1 1 0 0 0-1-1z"
              />
              <path
                fill="#424242"
                d="M43.89 10.55c-.59-1.19-1.48-.38-8 2.87 2-3 2.26-3.15 2-3.79l-1.73-4.42a16.47 16.47 0 0 0 1.4-1.6A1 1 0 0 0 37 2.22C27.84-1.26 15.82-.95 4.53 5.12A1 1 0 0 0 4 6v15.08A28.17 28.17 0 0 0 23.7 48a.88.88 0 0 0 .6 0A28.08 28.08 0 0 0 44 21.08c0-10.49 0-10.23-.11-10.53zM24 46A26.17 26.17 0 0 1 6 21.08V6.59a37.79 37.79 0 0 1 28.9-3c-1.37 1.51-1.24.71 1 6.26l-3.71 5.57a1 1 0 0 0 1.28 1.44L42 12.62v8.46A26.08 26.08 0 0 1 24 46z"
              />
            </g>
          </svg>
          <span className="text-2xl font-bold tracking-wide text-gray-800">
            HomeVerseEstate
          </span>
        </a>
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
