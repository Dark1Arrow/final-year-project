"use client"
import React, { useState } from 'react';
import axios from 'axios';

const LogoutIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);


const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/landlord/home' },
    { name: 'TopUP Wallet', href: '/landlord/topUp' },
    { name: 'Tenants Details', href: '/landlord/tenantsDetails' },
    { name: 'Manage Contract', href: '/landlord/manageContract' },
    { name: 'Manage Property', href: '/landlord/manageProperty' },
    { name: 'Transaction History', href: '/landlord/transactionHistory' },
    { name: 'Feedback', href: '/landlord/feedback' },
  ];

  const handleLogout = async () => {
    try {
      console.log("Logging out...");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`,
        {},
        {
          withCredentials: true, // important for clearing cookies/session
        }
      );

      // clear local storage or session data if you store tokens
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logout successful!");
      window.location.href = "/login"; // redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      alert(error.response?.data?.message || "Logout failed!");
    }
  };

  const NavLinks = ({ isMobile = false }) => (
    <div className={`
      ${isMobile ? 'flex flex-col space-y-2 mt-4' : 'hidden md:flex space-x-2 sm:space-x-4 md:space-x-8 items-center flex-grow'}
    `}>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={() => { setActiveLink(item.name); if (isMobile) setIsOpen(false); }}
          className="w-full"
        >
          <button
            className={`
              px-4 py-2 w-full text-left rounded-lg transition duration-200 ease-in-out
              text-sm md:text-base font-semibold whitespace-nowrap
              ${activeLink === item.name
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }
            `}
          >
            {item.name}
          </button>
        </a>
      ))}
    </div>
  );

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center">
          <div >
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

          <button
            className="md:hidden text-white ml-4 p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>


        <div className="hidden md:flex flex-grow items-center">
          <NavLinks />
        </div>


        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 sm:px-6 py-2 ml-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg transition duration-150 ease-in-out hover:bg-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <LogoutIcon className="text-lg w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <div
        className={`
          md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
        `}
      >
        <NavLinks isMobile={true} />
      </div>
    </nav>
  );
};

export default Navbar;