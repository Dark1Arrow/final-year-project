"use client"
import React, { useState } from 'react';

const WalletTopUpForm = () => {
  const initialFormState = {
    landlordId: '101',
    walletName: 'Nana', 
    walletAddress: 'jksf&%(,#{jsfkb434', 
    amount: '20', 
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTopUp = (e) => {
    e.preventDefault();
    console.log('Attempting to top up wallet with data:', formState);
    alert(`Top-up initiated for ${formState.amount}. Check console for details.`);
  };

  const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700";
  const labelStyle = "font-medium text-gray-700 min-w-[120px]";

  const FormRow = ({ label, name, value, readOnly = false }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-2">
      <label htmlFor={name} className={`${labelStyle} mb-1 sm:mb-0`}>
        {label} :
      </label>
      
      <div className="flex-1 sm:ml-4">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          readOnly={readOnly}
          className={`${inputStyle} ${readOnly ? 'bg-gray-100 cursor-default' : 'bg-white'}`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 flex justify-center items-start">
      <div className="w-full max-w-xl">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome ! <span className="text-blue-600">Jhon libertz</span>
        </h1>

        <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-100">
          <form onSubmit={handleTopUp} className="space-y-4">

            <FormRow 
              label="Landlord ID" 
              name="landlordId" 
              value={formState.landlordId} 
              readOnly 
            />

            <FormRow 
              label="Wallet Name" 
              name="walletName" 
              value={formState.walletName} 
              readOnly 
            />

            <FormRow 
              label="Wallet Address" 
              name="walletAddress" 
              value={formState.walletAddress} 
              readOnly 
            />

            <FormRow 
              label="Amount" 
              name="amount" 
              value={formState.amount}
              readOnly={false} 
            />

            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                TopUp Wallet
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletTopUpForm;