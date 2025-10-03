"use client"
import React, { useState } from 'react';
import { Eye, DollarSign, Calendar, Zap, TrendingUp, Home, User } from 'lucide-react';

const initialTransactions = [
  { id: 'F39493', tenant: 'Jhon', property: 'Andheri', amount: 500, date: '01 Sep 25', status: 'Success' },
  { id: 'FR434O', tenant: 'Nana', property: 'Naka', amount: 500, date: '01 Sep 25', status: 'Pending' },
  { id: 'TX5588', tenant: 'Alice', property: 'Apt 201', amount: 850, date: '15 Aug 25', status: 'Success' },
  { id: 'BT9011', tenant: 'Bob', property: 'Studio D', amount: 600, date: '01 Aug 25', status: 'Failed' },
];

const ViewActionButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="p-2 rounded-full transition-colors duration-200 text-blue-600 hover:bg-blue-100"
  >
    <Eye className="w-5 h-5" />
  </button>
);

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
    case 'Overdue':
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

const MobileTransactionCard = ({ transaction }) => {
  const handleView = (id) => console.log(`Viewing details for transaction ID: ${id}`);

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          {transaction.id}
        </h3>
        {getStatusBadge(transaction.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1 text-purple-400" />
          <span className="font-medium">Tenant:</span>
          <span className="ml-1 text-gray-900">{transaction.tenant}</span>
        </div>
        <div className="flex items-center">
          <Home className="w-4 h-4 mr-1 text-green-400" />
          <span className="font-medium">Property:</span>
          <span className="ml-1 text-gray-900 truncate">{transaction.property}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1 text-red-400" />
          <span className="font-medium">Amount:</span>
          <span className="ml-1 text-gray-900 font-bold">${transaction.amount}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-orange-400" />
          <span className="font-medium">Date:</span>
          <span className="ml-1 text-gray-900">{transaction.date}</span>
        </div>
        
      </div>

      <div className="flex justify-end pt-3 mt-3 border-t">
        <ViewActionButton label="View Details" onClick={() => handleView(transaction.id)} />
      </div>
    </div>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleView = (id) => {
    console.log(`Viewing full details for transaction ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" />
          Transaction Details
        </h1>

        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
           
            <thead className="bg-gray-50">
              <tr>
                {['Transaction ID', 'Tenant', 'Property', 'Amount', 'Date', 'Status', 'Action'].map((header) => (
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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {transaction.tenant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {transaction.property}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <ViewActionButton label="View Details" onClick={() => handleView(transaction.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {transactions.map((transaction) => (
            <MobileTransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;