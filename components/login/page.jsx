"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authDataLogin } from "@/constants/auth/data";

const LogInCard = () => {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    authDataLogin.isLoggedIn = true;
    authDataLogin.role = role;
    authDataLogin.username = username;

    if (role === "admin") router.push("/admin/dashboard");
    if (role === "landlord") router.push("/landlord/home");
    if (role === "tenant") router.push("/tenant/home");
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
                className={`pb-3 px-4 cursor-pointer ${
                  role === r
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

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-150"
            >
              Log in &gt;
            </button>
          </form>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          You don&apos;t have Account?
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
