"use client"

import React, { useState } from 'react';
import { Search, Zap, Clock, DollarSign, Home, Eye, Download, Check } from 'lucide-react';

const initialContracts = [
  { id: 1001, name: 'Flat #21', type: 'Flat', startDate: '01 Sep 25', endDate: '01 Sep 26', rent: 500, status: 'Pending', downloadable: false },
  { id: 1002, name: 'Flat #21', type: 'pg', startDate: '01 Sep 25', endDate: '01 Sep 26', rent: 500, status: 'Available', downloadable: true },
  { id: 1003, name: 'Studio C', type: 'Studio', startDate: '15 Oct 25', endDate: '15 Oct 26', rent: 650, status: 'Active', downloadable: true },
  { id: 1004, name: 'Villa #9', type: 'Villa', startDate: '01 Jan 26', endDate: '01 Jan 27', rent: 1200, status: 'Expired', downloadable: true },
];

const getStatusBadge = (status) => {
  let colorClass = '';
  switch (status) {
    case 'Available':
    case 'Active':
      colorClass = 'bg-teal-100 text-teal-800';
      break;
    case 'Pending':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    case 'Expired':
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

const ConfirmButton = ({ contractId, status }) => {
  const handleClick = () => {
    console.log(`Confirming contract ID: ${contractId}`);
  };
  
  const isDisabled = status !== 'Pending';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        px-4 py-2 text-sm font-medium rounded-xl transition duration-300 flex items-center justify-center min-w-[100px]
        ${isDisabled 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
        }
      `}
    >
      <Check className="w-4 h-4 mr-2" />
      Confirm
    </button>
  );
};

const ContractActions = ({ contract, handleView, handleDownload }) => (
    <div className="flex items-center space-x-2">
        <button
            onClick={() => handleView(contract.id)}
            aria-label="View Contract"
            className="p-2 rounded-full transition-colors duration-200 text-blue-600 hover:bg-blue-100"
        >
            <Eye className="w-5 h-5" />
        </button>
        <button
            onClick={() => handleDownload(contract.id)}
            aria-label="Download Contract"
            disabled={!contract.downloadable}
            className={`p-2 rounded-full transition-colors duration-200 ${
                contract.downloadable 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
        >
            <Download className="w-5 h-5" />
        </button>
    </div>
);

const MobileContractCard = ({ contract, handleView, handleDownload }) => {
  return (
    <div className="bg-white p-5 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-500" />
          {contract.name}
        </h3>
        {getStatusBadge(contract.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
        <div className="flex items-center col-span-2">
          <Clock className="w-4 h-4 mr-2 text-purple-400" />
          <span className="font-medium">Contract ID:</span>
          <span className="ml-1 text-gray-900 font-bold">{contract.id}</span>
        </div>
        <div className="flex items-center">
          <Home className="w-4 h-4 mr-2 text-green-400" />
          <span className="font-medium">Type:</span>
          <span className="ml-1 text-gray-900 capitalize">{contract.type}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-red-400" />
          <span className="font-medium">Rent:</span>
          <span className="ml-1 text-gray-900 font-bold">${contract.rent}</span>
        </div>
        <div className="flex items-center col-span-2">
          <Clock className="w-4 h-4 mr-2 text-orange-400" />
          <span className="font-medium">Dates:</span>
          <span className="ml-1 text-gray-900">{contract.startDate} - {contract.endDate}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
        <ConfirmButton contractId={contract.id} status={contract.status} />
        <ContractActions contract={contract} handleView={handleView} handleDownload={handleDownload} />
      </div>
    </div>
  );
};

const App = () => {
  const [contracts, setContracts] = useState(initialContracts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleView = (id) => console.log(`Viewing contract details for ID: ${id}`);
  const handleDownload = (id) => console.log(`Downloading contract for ID: ${id}`);


  const filteredContracts = contracts.filter(contract => 
    contract.id.toString().includes(searchTerm) ||
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          Contract Management
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
                {['Contract ID', 'Name', 'Type', 'Start Date', 'End Date', 'Monthly Rent', 'Status', 'Action'].map((header) => (
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
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contract.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {contract.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                    {contract.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {contract.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {contract.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${contract.rent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(contract.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {contract.status === 'Pending' ? (
                        <ConfirmButton contractId={contract.id} status={contract.status} />
                    ) : (
                        <ContractActions contract={contract} handleView={handleView} handleDownload={handleDownload} />
                    )}
                  </td>
                </tr>
              ))}
              {filteredContracts.length === 0 && (
                <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">No contracts found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredContracts.map((contract) => (
            <MobileContractCard 
                key={contract.id} 
                contract={contract} 
                handleView={handleView} 
                handleDownload={handleDownload} 
            />
          ))}
          {filteredContracts.length === 0 && (
             <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-lg">No contracts found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;