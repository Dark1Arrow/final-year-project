"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Eye, Pencil, Trash2, Zap, X, Home, MapPin, DollarSign } from "lucide-react";


const ActionButton = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`p-2 rounded-full transition-colors duration-200 ${color === "blue" ? "text-blue-600 hover:bg-blue-100" :
        color === "green" ? "text-green-600 hover:bg-green-100" :
          "text-red-600 hover:bg-red-100"
      }`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const AddPropertyModal = ({ isOpen, onClose, onConfirm, propertyData }) => {
  const [formData, setFormData] = useState({
    name: propertyData?.name || "",
    description: propertyData?.description || "",
    type: propertyData?.type || "Flat",
    address: propertyData?.address || "",
    city: propertyData?.city || "",
    rentPrice: propertyData?.rentPrice || "",
    securityDeposit: propertyData?.securityDeposit || "",
    rules: propertyData?.rules || "",
  });

  useEffect(() => {
    if (isOpen && propertyData) {
      setFormData({
        name: propertyData.name || "",
        description: propertyData.description || "",
        type: propertyData.type || "flat",
        address: propertyData.address || "",
        city: propertyData.city || "",
        rentPrice: propertyData.rentPrice || "",
        securityDeposit: propertyData.securityDeposit || "",
        rules: propertyData.rules || "",
      });
    } else if (isOpen && !propertyData) {
      setFormData({
        name: "",
        description: "",
        type: "flat",
        address: "",
        city: "",
        rentPrice: "",
        securityDeposit: "",
        rules: "",
      });
    }
  }, [isOpen, propertyData]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 p-4 sm:p-6 lg:p-12">
      <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {propertyData ? "Update Property" : "Add New Property"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">Property Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="mb-1 font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="flat">Flat</option>
              <option value="house">PG</option>
              <option value="apartment">Apartment</option>
              <option value="other">Studio</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rentPrice" className="mb-1 font-medium text-gray-700">Rent Price (INR)</label>
            <input
              type="number"
              id="rentPrice"
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="securityDeposit" className="mb-1 font-medium text-gray-700">Security Deposit (INR)</label>
            <input
              type="number"
              id="securityDeposit"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rules" className="mb-1 font-medium text-gray-700">Rules</label>
            <input
              type="text"
              id="rules"
              name="rules"
              value={formData.rules}
              onChange={handleChange}
              placeholder="e.g., No loud music after 10 PM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              {propertyData ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/property/ownerProperty`, { withCredentials: true });
      setProperties(res.data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleAction = async (action, property) => {
    if (action === "Delete") {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/property/delete/${property._id}`, { withCredentials: true });
        setProperties(prev => prev.filter(p => p._id !== property._id));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    } else if (action === "Edit") {
      setEditProperty(property);
      setIsModalOpen(true);
    } else if (action === "View") {
      alert(`Viewing property: ${property.name}, Rent: ${property.rentPrice} INR`);
    }
  };

  const handleConfirmAddProperty = async (newPropertyData) => {
    try {
      if (editProperty) {
        // Update
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/property/update/${editProperty._id}`, newPropertyData, { withCredentials: true });
        setProperties(prev => prev.map(p => p._id === editProperty._id ? res.data.data : p));
        setEditProperty(null);
      } else {
        // Add
        console.log(newPropertyData)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/property/create`, newPropertyData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProperties(prev => [...prev, res.data.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" /> Property Listings
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Name', 'Address', 'Type', 'Status', 'Rent', 'Action'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map(property => (
                <tr key={property._id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{property._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{property.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{property.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{property.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${property.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {property.status || "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{property.rentPrice} INR</td>
                  <td className="px-6 py-4 text-sm font-medium flex space-x-1">
                    <ActionButton icon={Eye} label="View" onClick={() => handleAction('View', property)} color="blue" />
                    <ActionButton icon={Pencil} label="Edit" onClick={() => handleAction('Edit', property)} color="green" />
                    <ActionButton icon={Trash2} label="Delete" onClick={() => handleAction('Delete', property)} color="red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {properties.map(property => (
            <div key={property._id} className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Home className="w-5 h-5 mr-2 text-blue-500" /> {property.name}
                </h3>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {property.status || "Available"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center"><span className="font-medium w-1/2">ID:</span> <span className="text-gray-900">{property._id}</span></div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-red-400" /> <span className="font-medium">Address:</span> <span className="ml-1 text-gray-900 truncate">{property.address}</span></div>
                <div className="flex items-center"><span className="font-medium w-1/2">Type:</span> <span className="text-gray-900">{property.type}</span></div>
                <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1 text-green-400" /> <span className="font-medium">Rent:</span> <span className="ml-1 text-gray-900 font-bold">{property.rentPrice} INR</span></div>
              </div>

              <div className="flex justify-end pt-3 mt-3 border-t space-x-1">
                <ActionButton icon={Eye} label="View" onClick={() => handleAction('View', property)} color="blue" />
                <ActionButton icon={Pencil} label="Edit" onClick={() => handleAction('Edit', property)} color="green" />
                <ActionButton icon={Trash2} label="Delete" onClick={() => handleAction('Delete', property)} color="red" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={() => { setEditProperty(null); setIsModalOpen(true); }} className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" /> Add Property
          </button>
        </div>
      </div>

      <AddPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddProperty}
        propertyData={editProperty}
      />
    </div>
  );
};

export default App;
