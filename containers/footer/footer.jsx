import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold text-green-500">FitSync</h2>
            <p className="text-gray-500 mt-2">
              Your personalized fitness companion. Workouts, diet, and habits — simplified.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-green-500">Home</a></li>
              <li><a href="/dashboard" className="hover:text-green-500">Dashboard</a></li>
              <li><a href="/workouts" className="hover:text-green-500">Workouts</a></li>
              <li><a href="/meals" className="hover:text-green-500">Meals</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-500 mb-4">Get fitness tips & wellness guides in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FitSync. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-500"><Facebook size={18} /></a>
            <a href="#" className="hover:text-green-500"><Instagram size={18} /></a>
            <a href="#" className="hover:text-green-500"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
