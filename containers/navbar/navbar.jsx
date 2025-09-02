"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react for icons

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-green-500">LOGO</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="/" className="hover:text-green-500">Home</a>
                        <a href="/dashboardPage" className="hover:text-green-500">Dashboard</a>
                        <a href="/workoutsPage" className="hover:text-green-500">Workouts</a>
                        <a href="/mealsPage" className="hover:text-green-500">Meals</a>
                        <a
                            href="/login"
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Login
                        </a>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu}>
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col px-4 py-3 space-y-3">
                        <a href="/" className="hover:text-green-500">Home</a>
                        <a href="/dashboard" className="hover:text-green-500">Dashboard</a>
                        <a href="/workouts" className="hover:text-green-500">Workouts</a>
                        <a href="/meals" className="hover:text-green-500">Meals</a>
                        <a
                            href="/login"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center"
                        >
                            Login
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar