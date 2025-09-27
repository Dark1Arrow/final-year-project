import { FaFileAlt, FaSearch, FaBriefcase, FaCheck } from 'react-icons/fa';

const contractHistory = [
  {
    status: 'Contract Drafted',
    details: 'by Jhon Doe',
    icon: FaFileAlt,
    iconColor: 'bg-blue-600',
    date: '2023-10-26, 10:30 AM',
  },
  {
    status: 'Sent for Legal Review',
    details: null,
    icon: FaFileAlt,
    iconColor: 'bg-orange-500',
    date: '2023-10-26, 10:30 AM',
  },
  {
    status: 'Signed by All Parties',
    details: null,
    icon: FaSearch,
    iconColor: 'bg-green-500',
    date: '2023-10-26, 10:30 AM',
  },
  {
    status: 'Finalized and Stored',
    details: null,
    icon: FaBriefcase,
    iconColor: 'bg-purple-600',
    date: '2023-10-26, 10:30 AM',
  },
  {
    status: 'Contract Completed',
    details: null,
    icon: FaCheck,
    iconColor: 'bg-teal-700',
    date: '2023-10-26, 10:30 AM',
  },
];

const statusKey = [
    { label: 'Drafted', color: 'bg-blue-600' },
    { label: 'Under Review', color: 'bg-orange-500' },
    { label: 'Finalized', color: 'bg-purple-600' },
    { label: 'Completed', color: 'bg-teal-700' },
];


const ContactHistory = () => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Contact History
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-12">
          
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="space-y-4">
              {statusKey.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="relative">
              <div className="absolute left-3.5 md:left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {contractHistory.map((item, index) => (
                <div key={index} className="mb-8 flex items-start">
                  
                  <div 
                    className={`relative z-10 flex items-center justify-center 
                                h-8 w-8 md:h-10 md:w-10 rounded-full text-white 
                                flex-shrink-0 ${item.iconColor} shadow-md`}
                  >
                    <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>

                  <div className="ml-6 flex-grow pt-1">
                    <p className="text-lg font-semibold text-gray-900 leading-tight">
                      {item.status} 
                      {item.details && (
                          <span className="font-normal text-gray-700 ml-1">
                            {item.details}
                          </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHistory;