"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Zap,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  Home,
  DollarSign,
} from "lucide-react";

// change if your backend is hosted

// ---------------------- COMPONENTS ----------------------

// Contract Detail Row
const ContractDetailRow = ({ property, tenants, colSpan }) => (
  <tr className="bg-blue-50/50 border-t border-blue-200 animate-fade-in-down">
    <td colSpan={colSpan} className="px-6 py-4 text-sm text-gray-700">
      <div className="p-4 bg-white rounded-lg shadow-inner border border-blue-100">
        <h4 className="font-bold text-blue-700 mb-3 border-b pb-1">
          Property Details for PId: {property._id}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start">
            <Home className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-600 block">
                Property Type:
              </span>
              <span className="text-gray-900">{property.type}</span>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-600 block">
                Full Location:
              </span>
              <span className="text-gray-900">{property.location}</span>
            </div>
          </div>

          <div className="flex items-start">
            <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-600 block">
                Monthly Rent:
              </span>
              <span className="text-gray-900">₹{property.rent}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-semibold text-gray-700 mb-2">
            Interested Tenants:
          </h5>
          {tenants.length === 0 ? (
            <p className="text-gray-500">No tenants have shown interest yet.</p>
          ) : (
            <ul className="space-y-2">
              {tenants.map((t) => (
                <li
                  key={t._id}
                  className="p-2 border rounded-md flex justify-between items-center bg-gray-50"
                >
                  <span className="text-gray-800">
                    {t.fullname} ({t.email})
                  </span>
                  <span className="text-sm text-gray-500">{t.phone}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </td>
  </tr>
);

// Modal for creating contract
const CreateContractModal = ({ tenant, property, onClose, onCreate }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(property)
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/booking/create`,
        {
          user: tenant._id, // user = tenant ID
          propertyId: property._id,
          landlordId: property.owner,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );

      const data = res.data.data;
      onCreate(data);
      alert("Booking created successfully!");
      onClose();
    } catch (err) {
      console.error("Booking creation error:", err);
      alert(err.response?.data?.message || "Error creating booking");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in-down">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Booking
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="font-medium text-gray-600">Tenant :</span>
              <span className="font-bold text-gray-900">{tenant.fullname}</span>

              <span className="font-medium text-gray-600">Phone :</span>
              <span className="font-bold text-gray-900">{tenant.phone}</span>

              <span className="font-medium text-gray-600">Property :</span>
              <span className="text-gray-900">{property.city}</span>

              <span className="font-medium text-gray-600">Rent :</span>
              <span className="text-gray-900">₹{property.rentPrice}</span>
            </div>

            <div className="space-y-4 pt-4 border-t mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="flex items-center px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                <FileText className="w-5 h-5 mr-2" /> Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
// ---------------------- MAIN COMPONENT ----------------------
const App = () => {
  const [landlordId] = useState("L001"); // Replace with actual logged-in landlord ID
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [tenantsMap, setTenantsMap] = useState({});
  const [selectedTenants, setSelectedTenants] = useState({}); // 👈 store selected tenant per property
  const [createModal, setCreateModal] = useState(null); // { tenant, property }

  // ✅ Fetch landlord properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/property/ownerProperty`, {
          withCredentials: true,
        });
        const data = res.data.data;
        console.log("Properties:", data);
        setProperties(data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, [landlordId]);

  // ✅ Fetch tenants for a selected property
  const handleViewDetails = async (propertyId) => {
    setSelectedPropertyId((prev) => (prev === propertyId ? null : propertyId));

    if (!tenantsMap[propertyId]) {
      try {
        const property = properties.find((p) => p._id === propertyId);
        if (!property || !property.interestedUsers?.length) {
          console.warn("No interested users found for this property");
          return;
        }

        const tenants = await Promise.all(
          property.interestedUsers.map(async (tId) => {
            const res = await axios.get(`${API_BASE_URL}/api/v1/users/${tId}`, {
              withCredentials: true,
            });
            return res.data.data;
          })
        );

        console.log("Fetched tenants for", propertyId, tenants);
        setTenantsMap((prev) => ({ ...prev, [propertyId]: tenants }));
      } catch (err) {
        console.error("Error fetching tenants:", err);
      }
    }
  };

  // ✅ Handle tenant selection for a property
  const handleTenantSelect = (propertyId, tenantId) => {
    setSelectedTenants((prev) => ({ ...prev, [propertyId]: tenantId }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <Zap className="w-7 h-7 mr-3 text-blue-500" />
            Manage Property Contract
          </h1>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Property ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Rent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Tenant</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <React.Fragment key={property._id}>
                  <tr className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-3 py-4">
                      <button
                        onClick={() => handleViewDetails(property._id)}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
                      >
                        {selectedPropertyId === property._id ? "Hide" : "Property Details"}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">{property._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{property.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{property.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{property.rentPrice}</td>

                    {/* 👇 Tenant Selector */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {tenantsMap[property._id] && tenantsMap[property._id].length > 0 ? (
                        <select
                          className="border rounded-lg px-2 py-1 text-sm focus:outline-none"
                          value={selectedTenants[property._id] || ""}
                          onChange={(e) => handleTenantSelect(property._id, e.target.value)}
                        >
                          <option value="">Select Tenant</option>
                          {tenantsMap[property._id].map((tenant) => (
                            <option key={tenant._id} value={tenant._id}>
                              {tenant.fullname}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-400 text-sm">No tenants</span>
                      )}
                    </td>

                    <td className="px-3 py-4 text-sm font-medium">
                      <button
                        disabled={!selectedTenants[property._id]}
                        onClick={() => {
                          const selectedTenant = tenantsMap[property._id]?.find(
                            (t) => t._id === selectedTenants[property._id]
                          );
                          if (selectedTenant)
                            setCreateModal({ property, tenant: selectedTenant });
                        }}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-white ${
                          selectedTenants[property._id]
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        Create Contract
                      </button>
                    </td>
                  </tr>

                  {selectedPropertyId === property._id && (
                    <ContractDetailRow
                      property={property}
                      tenants={tenantsMap[property._id] || []}
                      colSpan={7}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👇 Contract Creation Modal */}
      {createModal && (
        <CreateContractModal
          tenant={createModal.tenant}
          property={createModal.property}
          onClose={() => setCreateModal(null)}
          onCreate={() => setCreateModal(null)}
        />
      )}
    </div>
  );
};


export default App;
