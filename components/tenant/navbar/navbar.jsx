"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '';

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
    { name: 'Home', href: '/tenant/home' }, 
    { name: 'TopUP Wallet', href: '/tenant/topUp' },
    { name: 'Property Details', href: '/tenant/propertyDetails' },
    { name: 'Contract Details', href: '/tenant/contractDetails' },
    { name: 'Pay Rent', href: '/tenant/payRent' },
    { name: 'Transaction History', href: '/tenant/transactionHistory' },
    { name: 'Feedback', href: '/tenant/feedback' },
  ];

   const handleLogout = async () => {
    try {
      console.log("Logging out...");

      await axios.post(
        `${API_BASE_URL}/api/v1/users/logout`,
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
              ${
                activeLink === item.name
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
            <div className="text-3xl font-bold text-white tracking-wider mr-10">
                Logo
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