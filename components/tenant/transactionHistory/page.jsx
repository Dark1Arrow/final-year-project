"use client"
import React, { useState } from 'react';
import { Search, DollarSign, Clock, Home, Eye, CreditCard } from 'lucide-react';

const initialTransactions = [
  { id: 'F39493', name: 'Flat #21', type: 'Flat', amount: 500, date: '01 Sep 25', status: 'Success' },
  { id: 'FR4340', name: 'Flat #21', type: 'pg', amount: 500, date: '01 Sep 25', status: 'Pending' },
  { id: 'FR4341', name: 'Studio C', type: 'Studio', amount: 650, date: '01 Oct 25', status: 'Pending' },
  { id: 'T2001A', name: 'Villa #9', type: 'Villa', amount: 1200, date: '01 Aug 25', status: 'Failed' },
];

const getStatusBadge = (status) => {
  let colorClass = '';
  switch (status) {
    case 'Success':
      colorClass = 'bg-teal-100 text-teal-800';
      break;
    case 'Pending':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    case 'Failed':
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

const PayNowButton = ({ transactionId, status }) => {
  const handleClick = () => {
    console.log(`Initiating payment for transaction ID: ${transactionId}`);
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
      <CreditCard className="w-4 h-4 mr-2" />
      Pay now
    </button>
  );
};

const MobileTransactionCard = ({ transaction, handleView }) => {
  return (
    <div className="bg-white p-5 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" />
          ${transaction.amount}
        </h3>
        {getStatusBadge(transaction.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
        <div className="flex items-center col-span-2">
          <Clock className="w-4 h-4 mr-2 text-purple-400" />
          <span className="font-medium">ID:</span>
          <span className="ml-1 text-gray-900 font-bold">{transaction.id}</span>
        </div>
        <div className="flex items-center">
          <Home className="w-4 h-4 mr-2 text-blue-400" />
          <span className="font-medium">Property:</span>
          <span className="ml-1 text-gray-900">{transaction.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Date:</span>
          <span className="ml-1 text-gray-900">{transaction.date}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
        <button
            onClick={() => handleView(transaction.id)}
            aria-label="View Contract"
            className="p-2 rounded-full transition-colors duration-200 text-blue-600 hover:bg-blue-100"
        >
            <Eye className="w-5 h-5" />
        </button>
        <PayNowButton transactionId={transaction.id} status={transaction.status} />
      </div>
    </div>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  const handleView = (id) => console.log(`Viewing transaction details for ID: ${id}`);


  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          Your Transactions
        </h1>
        
        <div className="flex flex-col sm:flex-row justify-end items-center mb-8 gap-3 sm:gap-4">
            <div className="flex-grow sm:flex-grow-0 max-w-sm w-full relative">
                <input
                    type="text"
                    placeholder="Search by ID / Property Name"
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
                {['Transaction ID', 'Name', 'Type', 'Amount', 'Date', 'Status', 'Action'].map((header) => (
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                    <button
                        onClick={() => handleView(transaction.id)}
                        aria-label="View Transaction"
                        className="p-2 rounded-full transition-colors duration-200 text-gray-600 hover:bg-gray-100"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                    {transaction.status === 'Pending' && (
                        <PayNowButton transactionId={transaction.id} status={transaction.status} />
                    )}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">No transactions found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredTransactions.map((transaction) => (
            <MobileTransactionCard 
                key={transaction.id} 
                transaction={transaction} 
                handleView={handleView} 
            />
          ))}
          {filteredTransactions.length === 0 && (
             <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-lg">No transactions found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;