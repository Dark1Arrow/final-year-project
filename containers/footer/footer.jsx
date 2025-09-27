// components/Footer.jsx

// Ensure you have react-icons or lucide-react installed for social media icons.
// I'm using react-icons/fa (Font Awesome) here as they are widely recognized
import { FaYoutube, FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react'; // Using Lucide for contact icons

const Footer = () => {
  // Define contact and copyright details
  const contactEmail = 'logo9000@gmail.com';
  const contactPhone = '+91 9000909000';
  const copyrightYear = new Date().getFullYear();
  const companyName = 'Name';
  const disclaimerText =
    'This platform operates on a decentralized blockchain. All transactions are peer-to-peer. Users are responsible for their own due diligence.';

  return (
    // Outer container with dark background
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Section: Logo, Disclaimer, and Contact Info */}
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-12 pb-8">
          
          {/* Logo */}
          <div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/5">
            <span className="text-3xl font-light text-white">
              Logo
            </span>
          </div>

          {/* Disclaimer Text (Central) */}
          <div className="mb-6 lg:mb-0 lg:w-2/5">
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              {disclaimerText}
            </p>
          </div>

          {/* Contact Info (Right) */}
          <div className="lg:w-1/5 flex flex-col items-start lg:items-end space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-white">{contactEmail}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white">{contactPhone}</span>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-800 my-8" />

        {/* Bottom Section: Copyright and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2">
          
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              @{copyrightYear} {companyName}. All rights Reserved
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            {[FaYoutube, FaLinkedinIn, FaFacebookF, FaTwitter].map((Icon, index) => (
              <a
                key={index}
                href="#" // Replace with actual social links
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-full 
                           border border-gray-600 text-gray-400 transition 
                           duration-200 hover:border-white hover:text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;