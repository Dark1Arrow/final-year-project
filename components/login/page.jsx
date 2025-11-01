"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LogInCard = () => {
  const [role, setRole] = useState("tenant");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("goutam910@example.com"); // new email field
  const [password, setPassword] = useState("StrongPass123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, {
        username,
        email,
        password,
        role,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data, "hey");

      const user = response.data?.data?.user; // safe access
      if (!user) {
        alert("Login failed: Invalid response from server", user);
        return;
      }

      // save to auth data
      // authDataLogin.isLoggedIn = true;
      // authDataLogin.role = user?.role;
      // authDataLogin.username = user?.username;

      // route based on role
      if (user.role === "admin") router.push("/admin/dashboard");
      if (user.role === "landlord") router.push("/landlord/home");
      if (user.role === "tenant") router.push("/tenant/home");

    } catch (error) {
      console.error("Login error:", error);

      const status = error.response?.status;
      const message =
        (error.response?.data?.message) || error.message || "Something went wrong!";

      if (status === 400) {
        alert("Bad Request: " + message);
      } else if (status === 401) {
        alert("Unauthorized: Invalid username or password.");
      }else if (status === 422) {
        alert("Dont approve yet");
      } else if (status === 404) {
        alert("User not found. Please sign up first.");
      } else {
        alert("Login failed: " + message);
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
          {/* Role Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            {["admin", "landlord", "tenant"].map((r) => (
              <div
                key={r}
                onClick={() => setRole(r)}
                className={`pb-3 px-4 cursor-pointer ${role === r
                  ? "font-semibold text-gray-800 border-b-2 border-blue-600"
                  : "font-medium text-gray-500 hover:text-gray-700"
                  }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="User name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-150"
            >
              {loading ? "Logging in..." : "Log in >"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          You don&apos;t have an Account?
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium ml-1"
          >
            Get started
          </a>
        </div>
      </div>
    </>
  );
};

export default LogInCard;
