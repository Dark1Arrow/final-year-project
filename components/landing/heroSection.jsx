import { ArrowRight } from 'lucide-react';

const HeroSection = () => {

  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-gray-600 overflow-hidden">

      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url("/sunset-pool.png")`,
          backgroundColor: '#9ca3af' 
        }}
      >
      </div>

      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-xl">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Your Next Home,
            <br />
            Secured by Blockchain
          </h1>

          <p className="text-lg sm:text-xl font-light mb-8">
            Connect directly with landlords and tenants using smart contracts for a seamless experience.
          </p>

          <button className="flex items-center space-x-2 px-8 py-3 bg-white text-gray-800 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            <span>Start Now</span>
            <ArrowRight className="h-5 w-5 ml-1" />
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;