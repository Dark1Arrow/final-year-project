import React from 'react';

const ContactUsSection = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 sm:p-8 relative">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="bg-blue-900 text-white p-8 md:p-12 flex flex-col justify-between w-full md:w-1/3">
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-xl mr-4 mt-1">📍</div> 
                <div>
                  <p>23 Avenue de Paris</p>
                  <p>75012 Paris</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-xl mr-4">✉️</div> 
                <p>hello@mikechemardin.com</p>
              </div>
              <div className="flex items-center">
                <div className="text-xl mr-4">🌐</div>
                <p>mike.chemardin</p>
              </div>
              <div className="flex items-center">
                <div className="text-xl mr-4">📞</div> 
                <p>+33619530144</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-6 mt-10 md:mt-0">
            <div className="text-2xl hover:text-blue-300 cursor-pointer">📷</div>
            <div className="text-2xl hover:text-blue-300 cursor-pointer">🐦</div>
            <div className="text-2xl hover:text-blue-300 cursor-pointer">🔗</div>
          </div>
        </div>
        <div className="p-8 md:p-12 w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">Feel free to drop us a line below!</p>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Type your message here..."
                rows="6"
                className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;