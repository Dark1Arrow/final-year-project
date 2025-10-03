"use client"
import React, { useState } from 'react';

const TenantTable = () => {
  const [tenantData, setTenantData] = useState([
    {
      id: '1001',
      name: 'Jhon Libert',
      mobile: '9999403289',
      address: 'Address 0',
      email: 'work9090@gmail.com',
      status: 'Disapprove',
    },
    {
      id: '1002',
      name: 'Jane Doe',
      mobile: '9999123456',
      address: 'Address 1',
      email: 'jane.doe@mail.com',
      status: 'Approve',
    },
    {
      id: '1003',
      name: 'Alice Smith',
      mobile: '9999789012',
      address: 'Address 2',
      email: 'alice.s@mail.com',
      status: 'Approve',
    },
    {
      id: '1004',
      name: 'Bob Johnson',
      mobile: '9999345678',
      address: 'Address 3',
      email: 'bob.j@mail.com',
      status: 'Disapprove',
    },
    {
      id: '1005',
      name: 'Charlie Brown',
      mobile: '9999654321',
      address: 'Address 4',
      email: 'charlie.b@mail.com',
      status: 'Disapprove',
    },
    {
      id: '1006',
      name: 'Diana Prince',
      mobile: '9999098765',
      address: 'Address 5',
      email: 'diana.p@mail.com',
      status: 'Approve',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (index) => {
    const newStatus = tenantData[index].status === 'Approve' ? 'Disapprove' : 'Approve';
    setTenantData(tenantData.map((tenant, i) => 
      i === index ? { ...tenant, status: newStatus } : tenant
    ));
  };

  const filteredData = tenantData.filter(tenant =>
    tenant.id.includes(searchTerm) ||
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto flex justify-end mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by id / name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 shadow-md"
          onClick={() => console.log('Search clicked')}
        >
          Search
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">

            <thead className="bg-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Tenants ID
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Mobile No.
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Address
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((item, index) => (
                <tr key={item.id + index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.mobile}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.address}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleStatusChange(tenantData.findIndex(t => t.id === item.id && t.name === item.name))}
                      className={`
                        px-4 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === 'Approve'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }
                        transition duration-150
                      `}
                    >
                      {item.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantTable;