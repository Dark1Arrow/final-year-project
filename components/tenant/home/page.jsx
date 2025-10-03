"use client"
import React from 'react';

const userData = {
  name: 'Jhon libertz',
  personnel: {
    id: '101',
    mobile: '9000890009',
    address: 'new address',
    emailId: 'unknown - 35',
    status: 'Approved',
  },
  wallet: {
    walletName: 'Nana',
    accountName: 'account 0',
    accountPassword: '*************',
    walletPassword: '#*$) }#%ekjj 493o93',
  }
};

const UserDashboard = () => {
  const handleCheckBalance = () => {
    console.log('Checking balance for wallet:', userData.wallet.walletName);
  };

  const DetailCard = ({ title, details, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">{title}</h2>
      
      {details && Object.entries(details).map(([key, value]) => (
        <div key={key} className="flex text-gray-700 py-1.5 text-base">
          <span className="font-medium min-w-[120px] capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}:
          </span>
          <span className="ml-4 font-normal flex-1">
            {value}
          </span>
        </div>
      ))}
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
        Welcome ! <span className="text-blue-600">{userData.name}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        <DetailCard title="Personnel Details" details={userData.personnel} />

        <DetailCard title="Cirrus Wallet Details" details={userData.wallet}>
          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleCheckBalance}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Check Balance
            </button>
          </div>
        </DetailCard>
        
      </div>
    </div>
  );
};

export default UserDashboard;
