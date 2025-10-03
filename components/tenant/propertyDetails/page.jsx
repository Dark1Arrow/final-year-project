"use client"
import React, { useState } from 'react';
import { Search, Home, DollarSign, Zap, Clock, Send } from 'lucide-react';

const initialProperties = [
  { id: 1001, name: 'Flat #21', type: 'Flat', rent: 500, status: 'Pending' },
  { id: 1002, name: 'Flat #21', type: 'pg', rent: 500, status: 'Available' },
  { id: 1003, name: 'Studio C', type: 'Studio', rent: 650, status: 'Available' },
  { id: 1004, name: 'Villa #9', type: 'Villa', rent: 1200, status: 'Occupied' },
];

const getStatusBadge = (status) => {
  let colorClass = '';
  switch (status) {
    case 'Available':
      colorClass = 'bg-teal-100 text-teal-800';
      break;
    case 'Pending':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    case 'Occupied':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}
    >
      {status}
    </span>
  );
};

const InterestButton = ({ propertyId, status }) => {
  const handleClick = () => {
    if (status === 'Available' || status === 'Pending') {
      console.log(`Showing interest in property ID: ${propertyId}`);
    }
  };
  
  const isDisabled = status === 'Occupied';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        px-4 py-2 text-sm font-medium rounded-xl transition duration-300 flex items-center justify-center
        ${isDisabled 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
        }
      `}
    >
      <Send className="w-4 h-4 mr-2" />
      Show Interest
    </button>
  );
};

const MobilePropertyCard = ({ property }) => {
  return (
    <div className="bg-white p-5 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          {property.name}
        </h3>
        <span className="text-sm font-medium text-gray-500">ID: {property.id}</span>
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          <Zap className="w-4 h-4 mr-2 text-purple-400" />
          <span className="font-medium">Type:</span>
          <span className="ml-1 text-gray-900 capitalize">{property.type}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-orange-400" />
          <span className="font-medium">Status:</span>
          <span className="ml-2">{getStatusBadge(property.status)}</span>
        </div>
        <div className="flex items-center col-span-2">
          <DollarSign className="w-4 h-4 mr-2 text-red-400" />
          <span className="font-medium">Rent:</span>
          <span className="ml-1 text-gray-900 font-bold">${property.rent}</span>
        </div>
      </div>

      <div className="flex justify-center pt-4 mt-4 border-t border-gray-100">
        <InterestButton propertyId={property.id} status={property.status} />
      </div>
    </div>
  );
};

const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(property => 
    property.id.toString().includes(searchTerm) ||
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          Available Properties
        </h1>
        
        <div className="flex flex-col sm:flex-row justify-end items-center mb-8 gap-3 sm:gap-4">
            <div className="flex-grow sm:flex-grow-0 max-w-sm w-full relative">
                <input
                    type="text"
                    placeholder="Search by ID / Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 transition-shadow duration-300"
                />
            </div>
            <button
                className="w-full sm:w-auto items-center px-6 py-3 text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium"
            >
                Search
            </button>
        </div>

        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                {['Property ID', 'Name', 'Type', 'Rent', 'Status', 'Action'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {property.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {property.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                    {property.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${property.rent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(property.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <InterestButton propertyId={property.id} status={property.status} />
                  </td>
                </tr>
              ))}
              {filteredProperties.length === 0 && (
                <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">No properties found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredProperties.map((property) => (
            <MobilePropertyCard key={property.id} property={property} />
          ))}
          {filteredProperties.length === 0 && (
             <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-lg">No properties found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;