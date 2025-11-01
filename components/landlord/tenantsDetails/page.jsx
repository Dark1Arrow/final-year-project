"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, DollarSign, User, Home, Zap, X, FileText } from "lucide-react";


// Reusable view button
const ViewActionButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="p-2 rounded-full transition-colors duration-200 text-blue-600 hover:bg-blue-100"
  >
    <Eye className="w-5 h-5" />
  </button>
);

// Status badge
const getStatusBadge = (status) => {
  let colorClass = "";
  switch (status?.toLowerCase()) {
    case "completed":
    case "paid":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "pending":
      colorClass = "bg-orange-100 text-orange-800";
      break;
    case "overdue":
    case "cancelled":
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800";
  }
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${colorClass}`}
    >
      {status}
    </span>
  );
};

// Mobile view card
const MobileTenantCard = ({ tenant, onView }) => (
  <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
    <div className="flex items-center justify-between border-b pb-2 mb-2">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        {tenant.user?.fullname || "Unknown Tenant"}
      </h3>
      {getStatusBadge(tenant.status)}
    </div>

    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
      <div className="flex items-center">
        <span className="font-medium w-1/2">Booking ID:</span>
        <span className="text-gray-900">{tenant._id}</span>
      </div>
      <div className="flex items-center">
        <Home className="w-4 h-4 mr-1 text-purple-400" />
        <span className="font-medium">Property:</span>
        <span className="ml-1 text-gray-900 truncate">
          {tenant.property?.name}
        </span>
      </div>
      <div className="flex items-center">
        <DollarSign className="w-4 h-4 mr-1 text-green-400" />
        <span className="font-medium">Rent:</span>
        <span className="ml-1 text-gray-900 font-bold">
          ₹{tenant.property?.rentPrice}
        </span>
      </div>
    </div>

    <div className="flex justify-end pt-3 mt-3 border-t">
      <ViewActionButton label="View Details" onClick={() => onView(tenant)} />
    </div>
  </div>
);

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const handleDownload = () => {
    const data = `
Booking ID: ${booking._id}
Tenant: ${booking.user?.fullname || "Unknown"}
Tenant Email: ${booking.user?.email || "N/A"}
Property: ${booking.property?.name || "N/A"}
Address: ${booking.property?.address || "N/A"}
Rent: ₹${booking.property?.rentPrice || "—"}
Status: ${booking.status || "Unknown"}
Start Date: ${booking.startDate || "N/A"}
End Date: ${booking.endDate || "N/A"}
    `;
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_${booking._id}_Details.txt`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Contract Details
          </h2>
        </div>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p>
            <strong>Status:</strong> {getStatusBadge(booking.status)}
          </p>
          <p>
            <strong>Tenant:</strong> {booking.user?.fullname} (
            {booking.user?.email})
          </p>
          <p>
            <strong>Property:</strong> {booking.property?.name}
          </p>
          <p>
            <strong>Address:</strong> {booking.property?.address}
          </p>
          <p>
            <strong>Rent:</strong> ₹{booking.property?.rentPrice}
          </p>
          <p>
            <strong>Start Date:</strong> {booking.startDate || "N/A"}
          </p>
          <p>
            <strong>End Date:</strong> {booking.endDate || "N/A"}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Download Details
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/getLandlordBooking`,
          { withCredentials: true }
        );

        let bookingsData = res.data?.data || [];

        const enrichedBookings = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const [propertyRes, tenantRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/property/get/${booking.property}`, {
                  withCredentials: true,
                }),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${booking.user}`, {
                  withCredentials: true,
                }),
              ]);

              return {
                ...booking,
                property: propertyRes.data?.data || {},
                user: tenantRes.data?.data || {},
              };
            } catch (err) {
              console.error("Error fetching related data:", err);
              return booking;
            }
          })
        );
        setBookings(enrichedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" />
          Tenant Bookings & Contracts
        </h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No bookings found.</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Booking ID",
                      "Tenant",
                      "Property",
                      "Rent",
                      "Status",
                      "Action",
                    ].map((header) => (
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
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {booking._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {booking.user?.fullname || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {booking.property?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{booking.property?.rentPrice || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <ViewActionButton
                          label="View Details"
                          onClick={() => setSelectedBooking(booking)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {bookings.map((b) => (
                <MobileTenantCard
                  key={b._id}
                  tenant={b}
                  onView={setSelectedBooking}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default App;
