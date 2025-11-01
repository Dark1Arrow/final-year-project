"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCard,
  Wallet,
  Smartphone,
  Cpu,
  XCircle,
  Clock,
  CheckCircle,
  FileText,
  ArrowDownToLine,
  ReceiptText,
} from "lucide-react";


const theme = {
  bgSoft: "bg-gradient-to-br from-indigo-50 via-purple-50 to-white",
  font: "font-[Poppins]",
};

const formatCurrency = (amount) => `₹${amount?.toLocaleString("en-IN")}`;

const methodIcons = {
  upi: <Smartphone className="w-5 h-5 text-green-600" />,
  card: <CreditCard className="w-5 h-5 text-indigo-600" />,
  wallet: <Wallet className="w-5 h-5 text-amber-500" />,
  netbanking: <CreditCard className="w-5 h-5 text-purple-600" />,
  crypto: <Wallet className="w-5 h-5 text-blue-500" />,
};

const getStatusBadge = (status) => {
  const base = "flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm";
  switch (status?.toLowerCase()) {
    case "completed":
      return <span className={`${base} bg-green-100 text-green-700`}><CheckCircle className="w-4 h-4 mr-1" /> Completed</span>;
    case "pending":
      return <span className={`${base} bg-yellow-100 text-yellow-700`}><Clock className="w-4 h-4 mr-1" /> Pending</span>;
    case "cancelled":
      return <span className={`${base} bg-red-100 text-red-700`}><XCircle className="w-4 h-4 mr-1" /> Cancelled</span>;
    case "active":
      return <span className={`${base} bg-blue-100 text-blue-700`}><CheckCircle className="w-4 h-4 mr-1" /> Active</span>;
    default:
      return <span className={`${base} bg-gray-100 text-gray-600`}>Unknown</span>;
  }
};

const PaymentFormCard = ({ booking, onPayment, onClose }) => {
  const [amount, setAmount] = useState(booking.payment?.amount || 0);
  const [method, setMethod] = useState(booking.payment?.method || "upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const transactionId = `TXN-${Date.now()}`;

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/payment/create`,
        {
          bookingId: booking._id,
          userId: booking.user._id,
          landlordId: booking.landlord,
          propertyId: booking.property._id,
          amount,
          method,
          transactionId,
        },
        { withCredentials: true }
      );

      // Update parent with latest payment info
      onPayment({ ...booking, payment: res.data.data, status: "completed" });
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mb-10 rounded-3xl p-8 shadow-2xl bg-white/70 backdrop-blur-md border border-indigo-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-indigo-800 flex items-center">
          <ReceiptText className="w-6 h-6 mr-2" /> Complete Payment
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-indigo-600">
          <XCircle className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 mt-1 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 mt-1 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="netbanking">Net Banking</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition ${isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
            }`}
        >
          {isProcessing ? (
            <span className="flex justify-center items-center">
              <Cpu className="w-5 h-5 mr-2 animate-spin" /> Processing...
            </span>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </form>
    </div>
  );
};


const FinancialDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/booking/getAll`, { withCredentials: true });
      const data = res.data.data || [];

      // Fetch user, property, and payment details if exists
      const detailedBookings = await Promise.all(
        data.map(async (b) => {
          const [userRes, propertyRes, paymentRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/v1/users/${b.user}`, { withCredentials: true }),
            axios.get(`${API_BASE_URL}/api/v1/property/get/${b.property}`, { withCredentials: true }),
            b.payment ? axios.get(`${API_BASE_URL}/api/v1/payment/${b.payment}`, { withCredentials: true }) : Promise.resolve({ data: { data: null } }),
          ]);
          return {
            ...b,
            user: userRes.data.data,
            property: propertyRes.data.data,
            payment: paymentRes.data.data,
          };
        })
      );

      setBookings(detailedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayment = (updatedBooking) => {
    // Update bookings list with payment info
    setBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
    setSelectedBooking(null);
  };

  const handleDownloadReceipt = (b) => {
    const p = b.payment;
    if (!p) return alert("No payment found!");
    const details = `
--- Payment Receipt ---
Transaction ID: ${p.transactionId}
User: ${b.user?.fullname || "N/A"}
Property: ${b.property?.name || "N/A"}
Booking ID: ${b._id}
Amount: ${formatCurrency(p.amount)}
Method: ${p.method}
Status: ${p.status}
Date: ${p.date?.split("T")[0]}
--------------------------
Thank you for your payment!
    `;
    const blob = new Blob([details], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt-${p.transactionId}.txt`;
    link.click();
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading bookings...</div>;

  return (
    <div className={`${theme.bgSoft} min-h-screen py-10 px-5 sm:px-10 ${theme.font}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 flex items-center">
          <Wallet className="w-8 h-8 mr-3 text-indigo-600" /> Financial Dashboard
        </h1>
        <p className="text-gray-500 mb-10">Track, manage, and download your transactions.</p>

        {selectedBooking && (
          <PaymentFormCard
            booking={selectedBooking}
            onPayment={handlePayment}
            onClose={() => setSelectedBooking(null)}
          />
        )}

        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="p-5 border-b bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center text-gray-700">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" /> Payment Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-indigo-100/70">
                <tr>
                  {["Transaction", "User", "Property", "Amount", "Method", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-semibold text-indigo-700 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-3 font-mono text-gray-900">{b.payment?.transactionId || "N/A"}</td>
                    <td className="px-6 py-3">{b.user?.fullname || "N/A"}</td>
                    <td className="px-6 py-3">{b.property?.name || "N/A"}</td>
                    <td className="px-6 py-3 font-semibold">{formatCurrency(b.property?.rentPrice || 0)}</td>
                    <td className="px-6 py-3 flex items-center gap-2">
                      {methodIcons[b.payment?.method]} {b.payment?.method || "-"}
                    </td>
                    <td className="px-6 py-3">{getStatusBadge(b.status)}</td>
                    <td className="px-6 py-3 text-gray-500">{b.payment?.date?.split("T")[0] || "-"}</td>
                    <td className="px-6 py-3 flex gap-2">
                      {b.status !== "completed" ? (
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                        >
                          <CreditCard className="w-4 h-4 mr-1" /> Pay
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDownloadReceipt(b)}
                          className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
                        >
                          <ArrowDownToLine className="w-4 h-4 mr-1" /> Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
