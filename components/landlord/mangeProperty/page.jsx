"use client"
import React, { useState } from 'react';
import { Plus, Eye, Pencil, Trash2, Home, MapPin, DollarSign, Zap, X } from 'lucide-react';

const initialProperties = [
  { id: 1001, name: 'Minor Residence', location: 'Andheri, Mumbai', type: 'Flat', status: 'Available', rent: 500, currency: '$' },
  { id: 1002, name: 'Major Stay', location: 'Naka, Pune', type: 'PG', status: 'Available', rent: 500, currency: '$' },
  { id: 1003, name: 'Riverside Apt', location: 'Brooklyn, NY', type: 'Apartment', status: 'Rented', rent: 1200, currency: '$' },
  { id: 1004, name: 'Downtown Studio', location: 'Manhattan, NY', type: 'Studio', status: 'Available', rent: 950, currency: '$' },
];

const ActionButton = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`p-2 rounded-full transition-colors duration-200 ${color === 'blue' ? 'text-blue-600 hover:bg-blue-100' :
      color === 'green' ? 'text-green-600 hover:bg-green-100' :
        'text-red-600 hover:bg-red-100'}`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const MobilePropertyCard = ({ property, handleAction }) => {
  const statusColor = property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          {property.name}
        </h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}>
          {property.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium w-1/2">ID:</span>
          <span className="text-gray-900">{property.id}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-red-400" />
          <span className="font-medium">Location:</span>
          <span className="ml-1 text-gray-900 truncate">{property.location}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-1/2">Type:</span>
          <span className="text-gray-900">{property.type}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1 text-green-400" />
          <span className="font-medium">Rent:</span>
          <span className="ml-1 text-gray-900 font-bold">{property.currency}{property.rent}</span>
        </div>
      </div>

      <div className="flex justify-end pt-3 mt-3 border-t">
        <ActionButton icon={Eye} label="View" onClick={() => handleAction('View', property.id)} color="blue" />
        <ActionButton icon={Pencil} label="Edit" onClick={() => handleAction('Edit', property.id)} color="green" />
        <ActionButton icon={Trash2} label="Delete" onClick={() => handleAction('Delete', property.id)} color="red" />
      </div>
    </div>
  );
};

const AddPropertyModal = ({ isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        name: 'Goyal',
        location: 'IT Park',
        type: 'Flat',
        rent: '200',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    const FormRow = ({ label, name, children }) => (
        <div className="flex items-center mb-4 sm:mb-6">
            <label htmlFor={name} className="w-1/3 text-gray-700 font-medium text-sm sm:text-base pr-4 text-right">
                {label} :
            </label>
            <div className="w-2/3">
                {children}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 transition-opacity duration-300 p-4 sm:p-0">
            
            <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl shadow-2xl relative transform transition-all duration-300 scale-100 opacity-100">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>

                <form onSubmit={handleSubmit} className="mt-4">
                    
                    <FormRow label="Property Name" name="name">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </FormRow>

                    <FormRow label="Location" name="location">
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </FormRow>

                    <FormRow label="Type" name="type">
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
                        >
                            <option value="Flat">Flat</option>
                            <option value="PG">PG</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </FormRow>

                    <FormRow label="Rent" name="rent">
                        <input
                            id="rent"
                            name="rent"
                            type="number"
                            value={formData.rent}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </FormRow>

                    <div className="pt-4 flex justify-center">
                        <button
                            type="submit"
                            className="px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (action, id) => {
    console.log(`${action} property ID: ${id}`);
    if (action === 'Delete') {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleConfirmAddProperty = (newPropertyData) => {
    console.log("Confirmed new property:", newPropertyData);
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1001;
    const newProperty = {
        id: newId,
        name: newPropertyData.name,
        location: newPropertyData.location,
        type: newPropertyData.type,
        status: 'Available', 
        rent: parseInt(newPropertyData.rent, 10),
        currency: '$'
    };
    setProperties(prev => [...prev, newProperty]);
    setIsModalOpen(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" />
          Property Listings
        </h1>

        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Name', 'Location', 'Type', 'Status', 'Rent Price', 'Action'].map((header) => (
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
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {property.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {property.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {property.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {property.currency}{property.rent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <ActionButton icon={Eye} label="View" onClick={() => handleAction('View', property.id)} color="blue" />
                      <ActionButton icon={Pencil} label="Edit" onClick={() => handleAction('Edit', property.id)} color="green" />
                      <ActionButton icon={Trash2} label="Delete" onClick={() => handleAction('Delete', property.id)} color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {properties.map((property) => (
            <MobilePropertyCard key={property.id} property={property} handleAction={handleAction} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Property
          </button>
        </div>
      </div>

      <AddPropertyModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAddProperty}
      />
    </div>
  );
};

export default App;