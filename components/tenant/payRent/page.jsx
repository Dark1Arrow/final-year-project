"use client"
import React, { useState } from 'react';
import { Home, Calendar, DollarSign, CheckCircle, Clock, CreditCard, Receipt, Repeat, Wallet, Cpu } from 'lucide-react';

const initialRentSummary = {
  propertyName: 'Green Residency, Flat #21',
  monthlyRent: 12000,
  dueDate: '05 Oct 2025',
  status: 'Pending',
  lastPaymentDate: '05 Sep 2025',
  walletBalance: 5500, 
};

const initialPaymentHistory = [
  { id: 'TXN001', property: 'Flat #21', amount: 12000, date: '05 Sep 25', status: 'Success', mode: 'UPI' },
  { id: 'TXN002', property: 'Flat #21', amount: 12000, date: '05 Aug 25', status: 'Success', mode: 'Card' },
  { id: 'TXN003', property: 'Flat #21', amount: 12000, date: '05 Jul 25', status: 'Failed', mode: 'Wallet' },
];

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const getStatusBadge = (status) => {
  let colorClass = '';
  let icon = null;
  switch (status) {
    case 'Paid':
    case 'Success':
      colorClass = 'bg-teal-100 text-teal-800 border-teal-200';
      icon = <CheckCircle className="w-4 h-4 mr-1" />;
      break;
    case 'Pending':
      colorClass = 'bg-orange-100 text-orange-800 border-orange-200';
      icon = <Clock className="w-4 h-4 mr-1" />;
      break;
    case 'Overdue':
    case 'Failed':
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      icon = <Repeat className="w-4 h-4 mr-1" />;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
  }
  return (
    <span
      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${colorClass} items-center justify-center`}
    >
      {icon}
      {status}
    </span>
  );
};

const RentSummaryCard = ({ summary }) => {
  const { status, monthlyRent, dueDate, propertyName, lastPaymentDate } = summary;
  
  const statusColors = {
    Paid: 'text-teal-600 border-teal-400',
    Pending: 'text-orange-600 border-orange-400',
    Overdue: 'text-red-600 border-red-400',
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border-t-4 border-blue-500 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Rent Summary <Home className="w-6 h-6 ml-3 text-blue-500" />
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        
        <div className={`p-4 rounded-xl flex flex-col justify-center items-center font-bold text-xl transition-all duration-300 ${
            status === 'Paid' ? 'bg-teal-50 border border-teal-300' : 
            status === 'Pending' ? 'bg-orange-50 border border-orange-300' :
            'bg-red-50 border border-red-300'
        }`}>
            <span className={`text-sm uppercase font-medium mb-1 ${statusColors[status]}`}>Current Status</span>
            {getStatusBadge(status)}
        </div>
        
        <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="flex flex-col">
                <span className="font-medium text-gray-500 flex items-center"><Home className="w-4 h-4 mr-2"/> Property Name:</span>
                <span className="font-semibold text-gray-900">{propertyName}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-gray-500 flex items-center"><DollarSign className="w-4 h-4 mr-2"/> Monthly Rent:</span>
                <span className="font-semibold text-gray-900 text-xl">{formatCurrency(monthlyRent)}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-gray-500 flex items-center"><Calendar className="w-4 h-4 mr-2"/> Due Date:</span>
                <span className="font-semibold text-gray-900">{dueDate}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-2"/> Last Payment:</span>
                <span className="font-semibold text-gray-900">{lastPaymentDate || 'N/A'}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = ({ rentAmount, walletBalance }) => {
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [amount, setAmount] = useState(rentAmount);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log(`Paying ${formatCurrency(amount)} using ${paymentMode}`);
    
    setTimeout(() => {
        setIsProcessing(false);
        alert(`Payment of ${formatCurrency(amount)} initiated via ${paymentMode}. Check console for details.`);
        
    }, 2000);
  };
  
  const isWalletInsufficient = paymentMode === 'Wallet' && amount > walletBalance;

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Payment Form <CreditCard className="w-6 h-6 ml-3 text-red-500" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount to Pay</label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-semibold"
              min={rentAmount}
              step="100"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">Rent amount: {formatCurrency(rentAmount)}</p>
        </div>
        
        <div>
          <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
          <select
            id="paymentMode"
            name="paymentMode"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UPI">UPI (Google Pay, PhonePe, etc.)</option>
            <option value="Card">Credit / Debit Card</option>
            <option value="Wallet">In-App Wallet</option>
          </select>
        </div>
        
        {paymentMode === 'Wallet' && (
          <div className={`p-3 rounded-xl flex justify-between items-center text-sm ${isWalletInsufficient ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            <span className="flex items-center font-medium"><Wallet className="w-4 h-4 mr-2"/> Wallet Balance:</span>
            <span className="font-bold">{formatCurrency(walletBalance)}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isProcessing || isWalletInsufficient}
          className={`w-full py-3 text-lg font-semibold rounded-xl transition duration-300 ease-in-out flex items-center justify-center shadow-lg ${
            isProcessing || isWalletInsufficient
            ? 'bg-gray-400 cursor-not-allowed text-gray-600'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isProcessing ? (
            <>
              <Cpu className="w-5 h-5 mr-3 animate-spin"/> Processing...
            </>
          ) : isWalletInsufficient ? (
             'Insufficient Wallet Balance'
          ) : (
            'Pay Rent Now'
          )}
        </button>
      </form>
    </div>
  );
};

const PaymentHistoryTable = ({ history }) => {
  
  const handleAction = (id, status) => {
    if (status === 'Failed') {
      console.log(`Retrying payment for transaction ID: ${id}`);
    } else {
      console.log(`Viewing receipt for transaction ID: ${id}`);
    }
  };

  const headers = ['Transaction ID', 'Property', 'Amount', 'Date', 'Status', 'Action'];

  const MobileHistoryCard = ({ transaction }) => (
    <div className="bg-white p-5 mb-4 rounded-xl shadow-md border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" />
          {formatCurrency(transaction.amount)}
        </h3>
        {getStatusBadge(transaction.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="font-medium">ID:</div>
        <div className="font-bold text-gray-900">{transaction.id}</div>
        
        <div className="font-medium">Property:</div>
        <div>{transaction.property}</div>
        
        <div className="font-medium">Date:</div>
        <div>{transaction.date}</div>
        
        <div className="font-medium">Mode:</div>
        <div className="capitalize">{transaction.mode}</div>
      </div>
      
      <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
        <button
          onClick={() => handleAction(transaction.id, transaction.status)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition duration-300 flex items-center ${
            transaction.status === 'Failed' 
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
          }`}
        >
          {transaction.status === 'Failed' ? 
            <><Repeat className="w-4 h-4 mr-2" /> Retry Payment</> : 
            <><Receipt className="w-4 h-4 mr-2" /> View Receipt</>
          }
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center">
        Payment History
      </h2>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
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
            {history.map((txn) => (
              <tr key={txn.id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {txn.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {txn.property}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(txn.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {txn.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(txn.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleAction(txn.id, txn.status)}
                    className={`px-4 py-2 text-xs font-medium rounded-xl transition duration-300 flex items-center ${
                      txn.status === 'Failed' 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {txn.status === 'Failed' ? 
                      <Repeat className="w-3 h-3 mr-1" /> : 
                      <Receipt className="w-3 h-3 mr-1" />
                    }
                    {txn.status === 'Failed' ? 'Retry Payment' : 'View Receipt'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {history.map((txn) => (
          <MobileHistoryCard key={txn.id} transaction={txn} />
        ))}
      </div>
    </div>
  );
};


const App = () => {
  const [summary, setSummary] = useState(initialRentSummary);
  const [history, setHistory] = useState(initialPaymentHistory);
  
  const handlePaymentSuccess = () => {
      // This function would be called after a successful form submission
      // For demonstration, we'll just log it.
      console.log("Payment successful! UI should now update.");
      // setSummary({...summary, status: 'Paid', lastPaymentDate: new Date().toLocaleDateString()});
      // setHistory([...history, { new_transaction_data }]);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Tenant Pay Rent Portal
        </h1>

        <RentSummaryCard summary={summary} />

        {summary.status !== 'Paid' && (
          <PaymentForm 
            rentAmount={summary.monthlyRent} 
            walletBalance={summary.walletBalance}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
        
        <PaymentHistoryTable history={history} />

      </div>
    </div>
  );
};

export default App;