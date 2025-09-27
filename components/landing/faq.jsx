// components/AccessLevelSection.jsx

// Ensure you have lucide-react installed: npm install lucide-react
import { ShieldCheck, Handshake, MessageSquareText, Settings, Home, User } from 'lucide-react';

// Data for the top feature icons
const topFeatures = [
  {
    icon: ShieldCheck,
    title: 'Secure Connection',
    description: 'A protected and private channel for all interactions.',
  },
  {
    icon: Handshake, // Note: Lucide doesn't have a direct "handshake" icon, 
                    // so we use one that resembles it or a custom SVG if needed. 
                    // For now, this is a placeholder. If you want the exact icon,
                    // you'd need a custom SVG or a different icon library.
    title: '', // Title is implicitly the handshake image
    description: '', // Description is implicitly handled by the image
    isImage: true, // Special flag for the handshake image
    // You'd place the handshake image in your public folder, e.g., /images/handshake.png
    imageSrc: '/images/handshake.png', 
  },
  {
    icon: MessageSquareText,
    title: 'Seamless Communication',
    description: 'Effortless and clear messaging between all parties.',
  },
];

// Data for the bottom access level buttons
const accessLevels = [
  {
    icon: Settings,
    title: 'Admin Access',
    bgColor: 'bg-blue-900', // Darker blue for Admin
    href: '/admin/login', // Example link
  },
  {
    icon: Home, // Using 'Home' for Landlord Portal
    title: 'Landlord Access',
    bgColor: 'bg-blue-600', // Brighter blue for Landlord
    href: '/landlord/login', // Example link
  },
  {
    icon: User,
    title: 'Tenant Portal',
    bgColor: 'bg-teal-500', // Teal for Tenant
    href: '/tenant/login', // Example link
  },
];

const AccessLevelSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Icons Section */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 mb-20">
          {topFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center max-w-[200px] text-center">
              {feature.isImage ? (
                // Render image for handshake
                <img src={feature.imageSrc} alt="Handshake" className="w-24 h-24 mb-4 object-contain" />
              ) : (
                // Render Lucide icon
                <feature.icon className="w-24 h-24 text-gray-800 mb-4" />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action: Sign In Based on Access Level */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Sign in Based On Your Access Level
          </h2>
        </div>

        {/* Access Level Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
          {accessLevels.map((level, index) => (
            <a
              key={index}
              href={level.href} // This makes the div a clickable link
              className={`flex flex-col items-center justify-center 
                          w-full md:w-64 h-40 md:h-48 p-6 rounded-xl 
                          text-white shadow-xl transform transition-all duration-300
                          hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 
                          focus:ring-opacity-75 ${level.bgColor} 
                          ${level.bgColor === 'bg-blue-900' ? 'focus:ring-blue-900/50' : ''}
                          ${level.bgColor === 'bg-blue-600' ? 'focus:ring-blue-600/50' : ''}
                          ${level.bgColor === 'bg-teal-500' ? 'focus:ring-teal-500/50' : ''}
                        `}
            >
              <level.icon className="w-10 h-10 mb-3" />
              <span className="text-lg font-semibold">{level.title}</span>
            </a>
          ))}
        </div>

        {/* New User? Create Account link */}
        <div className="text-center mt-16 text-gray-700">
          <p className="text-lg">
            New User ?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-semibold">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccessLevelSection;