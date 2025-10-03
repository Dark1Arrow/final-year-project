"use client"
import React, { useState } from 'react';
import { Eye, DollarSign, User, Home, MapPin, Zap } from 'lucide-react';

const initialTenants = [
  { id: 1001, name: 'Jhon Doe', property: 'Villa #7', rent: 120, status: 'Paid', tenantId: 'T1001' },
  { id: 1002, name: 'Nana Smith', property: 'Villa #7', rent: 120, status: 'Pending', tenantId: 'T1002' },
  { id: 1003, name: 'Alice Johnson', property: 'Apt 201', rent: 850, status: 'Paid', tenantId: 'T1003' },
  { id: 1004, name: 'Bob Williams', property: 'Studio D', rent: 600, status: 'Overdue', tenantId: 'T1004' },
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
    case 'Paid':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Pending':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
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

const MobileTenantCard = ({ tenant }) => {
  const handleView = (id) => console.log(`Viewing details for tenant ID: ${id}`);

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-500" />
          {tenant.name}
        </h3>
        {getStatusBadge(tenant.status)}
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium w-1/2">ID:</span>
          <span className="text-gray-900">{tenant.tenantId}</span>
        </div>
        <div className="flex items-center">
          <Home className="w-4 h-4 mr-1 text-purple-400" />
          <span className="font-medium">Property:</span>
          <span className="ml-1 text-gray-900 truncate">{tenant.property}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1 text-green-400" />
          <span className="font-medium">Rent:</span>
          <span className="ml-1 text-gray-900 font-bold">${tenant.rent}</span>
        </div>
        
      </div>

      <div className="flex justify-end pt-3 mt-3 border-t">
        <ViewActionButton label="View Details" onClick={() => handleView(tenant.id)} />
      </div>
    </div>
  );
};

const App = () => {
  const [tenants, setTenants] = useState(initialTenants);

  const handleView = (id) => {
    console.log(`Viewing full details for tenant ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" />
          Tenants Details
        </h1>

        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                {['Tenants ID', 'Name', 'Property', 'Rent', 'Status', 'Action'].map((header) => (
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
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tenant.tenantId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {tenant.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${tenant.rent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <ViewActionButton label="View Details" onClick={() => handleView(tenant.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {tenants.map((tenant) => (
            <MobileTenantCard key={tenant.id} tenant={tenant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;