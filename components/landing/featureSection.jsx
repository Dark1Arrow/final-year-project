import { Settings, User, Users, Landmark } from 'lucide-react'; 

const featuresData = [
  {
    icon: Settings,
    title: 'Admin',
    description: 'Oversee the platform and ensure a seamless, secure experience for all users.',
  },
  {
    icon: User,
    title: 'Tenants',
    description: 'Find your next home and manage your rental agreements with peace of mind.',
  },
  {
    icon: Settings,
    title: 'Landlords',
    description: 'Easily manage your properties, contracts, and tenant communication securely.',
  },
  {
    icon: Landmark,
    title: 'Governments',
    description: 'Access a transparent and secure record of contracts for legal and regulatory purposes.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center md:text-left mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Secure Communication
          </h2>
          <p className="mt-2 text-xl font-medium text-gray-700">
            Powered by Blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-md 
                         hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              
              <div className="flex justify-center md:justify-start mb-6">
                <feature.icon className="h-10 w-10 text-indigo-600" aria-hidden="true" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
              </div>

              <p className="text-center md:text-left text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;