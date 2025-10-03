"use client"
import React, { useState } from 'react';
import { Eye, Pencil, Zap, FileText, Calendar, Plus, X } from 'lucide-react';

const initialContracts = [
  { id: 1001, property: 'Villa #7', tenant: 'Jhon', startDate: '01 Sep 25', endDate: '01 Sep 26', status: 'Active' },
  { id: 1002, property: 'Villa #7', tenant: 'Nana', startDate: '01 Sep 25', endDate: '01 Sep 25', status: 'Pending' },
  { id: 1003, property: 'Apt 201', tenant: 'Alice', startDate: '15 Oct 25', endDate: '15 Oct 26', status: 'Active' },
  { id: 1004, property: 'Studio D', tenant: 'Bob', startDate: '01 Jan 26', endDate: '01 Jan 27', status: 'Expired' },
];

const ActionButton = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`p-2 rounded-full transition-colors duration-200 ${
      color === 'blue' ? 'text-blue-600 hover:bg-blue-100' :
      color === 'green' ? 'text-green-600 hover:bg-green-100' :
      'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const getStatusBadge = (status) => {
  let colorClass = '';
  switch (status) {
    case 'Active':
      colorClass = 'bg-green-100 text-green-800';
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

const MobileContractCard = ({ contract, handleView, handleEdit }) => {
  const isEditable = contract.status === 'Pending'; 

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Contract ID: {contract.id}
        </h3>
        {getStatusBadge(contract.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center col-span-2">
          <span className="font-medium w-1/4">Tenant:</span>
          <span className="text-gray-900 font-medium">{contract.tenant}</span>
        </div>
        <div className="flex items-center col-span-2">
          <span className="font-medium w-1/4">Property:</span>
          <span className="ml-1 text-gray-900 truncate">{contract.property}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-purple-400" />
          <span className="font-medium">Start:</span>
          <span className="ml-1 text-gray-900">{contract.startDate}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-red-400" />
          <span className="font-medium">End:</span>
          <span className="ml-1 text-gray-900">{contract.endDate}</span>
        </div>
      </div>

      <div className="flex justify-end pt-3 mt-3 border-t">
        {isEditable ? (
          <ActionButton icon={Pencil} label="Edit Contract" onClick={() => handleEdit(contract.id)} color="green" />
        ) : (
          <ActionButton icon={Eye} label="View Contract" onClick={() => handleView(contract.id)} color="blue" />
        )}
      </div>
    </div>
  );
};

const CreateContractForm = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        property: 'Acme-Apartment 016',
        tenant: 'Jhon doe',
        contractId: 'CN-39893',
        startDate: '2025-10-01',
        endDate: '2026-09-30',
        rent: '500$'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };
    
    const properties = ['Acme-Apartment 016', 'Villa #7', 'Studio D', 'Apt 201'];
    const tenants = ['Jhon doe', 'Nana Smith', 'Alice Johnson', 'Bob Williams'];


    const SectionCard = ({ title, children }) => (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
            {children}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900">Create New Lease Contract</h1>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors hover:bg-gray-100"
                    aria-label="Close form"
                >
                    <X className="w-7 h-7" />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
               
                <SectionCard title="1. Property & Tenants">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                       
                        <div className="flex flex-col">
                            <label htmlFor="property" className="text-sm font-medium text-gray-700 sr-only">Property</label>
                            <select
                                id="property"
                                name="property"
                                value={formData.property}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none text-gray-800"
                            >
                                {properties.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="tenant" className="text-sm font-medium text-gray-700 sr-only">Tenant</label>
                            <select
                                id="tenant"
                                name="tenant"
                                value={formData.tenant}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none text-gray-800"
                            >
                                {tenants.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <label htmlFor="contractId" className="block text-sm font-medium text-gray-700 mb-2">Contract ID</label>
                        <input
                            id="contractId"
                            name="contractId"
                            type="text"
                            value={formData.contractId}
                            onChange={handleChange}
                            readOnly 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                    </div>
                </SectionCard>

                <SectionCard title="2. Contact Dates & Rent Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="flex flex-col">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Starting Date</label>
                            <div className="relative">
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800 appearance-none"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Ending Date</label>
                            <div className="relative">
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800 appearance-none"
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4 md:col-span-2">
                            <label htmlFor="rent" className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent Amount</label>
                            <input
                                id="rent"
                                name="rent"
                                type="text"
                                value={formData.rent}
                                onChange={handleChange}
                                required
                                className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                            />
                        </div>
                    </div>
                </SectionCard>
                
                <div className="flex justify-center space-x-4 pt-4">
                    <button
                        type="submit"
                        className="flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Create Contract
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center px-8 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const App = () => {
  const [contracts, setContracts] = useState(initialContracts);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleView = (id) => {
    console.log(`Viewing contract ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing contract ID: ${id}`);
  };
  
  const handleCreateContract = (newContractData) => {
    console.log("Creating new contract:", newContractData);
    const newId = contracts.length > 0 ? Math.max(...contracts.map(c => c.id)) + 1 : 1001;
    const newContract = {
        id: newId,
        property: newContractData.property,
        tenant: newContractData.tenant,
        startDate: newContractData.startDate.replace(/-/g, '/'), 
        endDate: newContractData.endDate.replace(/-/g, '/'),
        status: 'Pending'
    };
    setContracts(prev => [newContract, ...prev]);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center">
              <Zap className="w-7 h-7 mr-3 text-blue-500" />
              Manage Property Contract
            </h1>
            <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-base"
            >
                <Plus className="w-5 h-5 mr-2" />
                New Contract
            </button>
        </div>

        {isFormOpen ? (
            <CreateContractForm 
                onClose={() => setIsFormOpen(false)}
                onCreate={handleCreateContract}
            />
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
              <table className="min-w-full divide-y divide-gray-200">
            
                <thead className="bg-gray-50">
                  <tr>
                    {['Contract ID', 'Property', 'Tenant', 'Start Date', 'End Date', 'Status', 'Contract'].map((header) => (
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
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contract.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contract.property}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contract.tenant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contract.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {contract.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(contract.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1">
                          {contract.status === 'Pending' ? (
                            <ActionButton icon={Pencil} label="Edit Contract" onClick={() => handleEdit(contract.id)} color="green" />
                          ) : (
                            <ActionButton icon={Eye} label="View Contract" onClick={() => handleView(contract.id)} color="blue" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {contracts.map((contract) => (
                <MobileContractCard
                  key={contract.id}
                  contract={contract}
                  handleView={handleView}
                  handleEdit={handleEdit}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
