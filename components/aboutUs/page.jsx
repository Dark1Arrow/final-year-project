"use client"

import React from 'react';
import { Home, Zap, CreditCard, Users, Shield, TrendingUp, Compass } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: "Digital Wallet Integration",
    description: "Secure top-ups, rent payments, and detailed transaction tracking, all managed efficiently in one secure place.",
  },
  {
    icon: Zap,
    title: "Smart Contracts",
    description: "Landlords create agreements, tenants confirm digitally, and payments finalize the deal instantly without delays or paperwork.",
  },
  {
    icon: Users,
    title: "Role-based Dashboards",
    description: "Separate, tailored views for Admin, Landlord, and Tenant, ensuring every user sees only the information relevant to their role.",
  },
  {
    icon: Shield,
    title: "Transparency & Trust",
    description: "Every transaction, contract status, and feedback item is recorded on the platform, providing confidence and security to all parties.",
  },
];

const roles = [
    {
        title: "Landlords",
        description: "Easily manage properties, create digital contracts, track incoming payments, and receive tenant feedback in real-time.",
        icon: Home,
        color: "text-blue-600 bg-blue-50",
    },
    {
        title: "Tenants",
        description: "Enjoy a smooth, secure rental experience with digital contracts, transparent payments, and effortless access to all history.",
        icon: Users,
        color: "text-teal-600 bg-teal-50",
    },
    {
        title: "Admins",
        description: "Oversee the entire system, ensuring fair usage, handling disputes, moderating feedback, and maintaining trust between all users.",
        icon: Compass,
        color: "text-purple-600 bg-purple-50",
    },
];


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center py-16 bg-white rounded-xl shadow-2xl mb-12 border-b-4 border-blue-500">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            🏠 Welcome to <span className="text-blue-600">Cirrus</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A next-generation Property Rental and Management Platform designed to make renting **smarter, safer, and more transparent** for everyone.
          </p>
        </header>

        <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                One Seamless Ecosystem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map((role, index) => (
                    <div 
                        key={index} 
                        className={`p-6 rounded-xl shadow-lg border-t-4 ${role.color.replace(/bg-\w+-\d+/, 'border-')} bg-white hover:shadow-xl transition-shadow duration-300`}
                    >
                        <div className={`p-3 rounded-full inline-block mb-4 ${role.color}`}>
                            <role.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{role.title}</h3>
                        <p className="text-gray-600">{role.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="mb-16 bg-white p-8 sm:p-12 rounded-xl shadow-2xl border-t-4 border-teal-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center">
                <Shield className="w-8 h-8 mr-3 text-teal-600" />
                Why Cirrus is Unique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                {features.map((feature, index) => (
                    <div key={index} className="flex space-x-4 items-start">
                        <div className="flex-shrink-0 p-3 rounded-full bg-blue-500 text-white shadow-md">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-8 rounded-xl shadow-lg bg-white border border-gray-100">
                <h3 className="text-3xl font-extrabold text-blue-600 mb-4 flex items-center">
                    <TrendingUp className="w-7 h-7 mr-3" />
                    Our Mission
                </h3>
                <p className="text-gray-700 text-lg">
                    To create a **secure, transparent, and efficient** rental ecosystem where landlords and tenants can build trust through technology, and admins can ensure smooth operations.
                </p>
            </div>

            <div className="p-8 rounded-xl shadow-lg bg-white border border-gray-100">
                <h3 className="text-3xl font-extrabold text-blue-600 mb-4 flex items-center">
                    <Zap className="w-7 h-7 mr-3" />
                    Our Vision
                </h3>
                <p className="text-gray-700 text-lg">
                    To become the go-to **digital rental management system** that eliminates disputes, saves time, and fundamentally simplifies the rental experience for millions globally.
                </p>
            </div>
        </section>

        <div className="text-center mt-16 p-8 bg-blue-600 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to simplify your renting?</h3>
            <button
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
                Get Started with Cirrus Today
            </button>
        </div>

      </div>
    </div>
  );
};

export default App;