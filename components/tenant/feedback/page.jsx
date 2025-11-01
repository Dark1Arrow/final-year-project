"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, MessageSquarePlus, Trash2 } from "lucide-react";


// Rating stars component
const RatingStars = ({ rating }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-100"
        }`}
      />
    ))}
  </div>
);

// Modal for Add/Edit Feedback
const FeedbackModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    propertyId: "",
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        propertyId: initialData.propertyId || "",
        rating: initialData.rating || 0,
        comment: initialData.comment || "",
      });
    } else {
      setFormData({ propertyId: "", rating: 0, comment: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (val) => {
    setFormData((prev) => ({ ...prev, rating: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-5">
          {initialData ? "Edit Feedback" : "Add Feedback"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Property</label>
            <input
              type="text"
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              required
              placeholder="Enter property name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const val = i + 1;
                return (
                  <Star
                    key={i}
                    onClick={() => handleRatingChange(val)}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      val <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 hover:text-yellow-300 hover:fill-yellow-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Write your feedback..."
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {initialData ? "Save" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/review/get`, {
        withCredentials: true,
      });
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/review/${editData._id}`, data, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/review/create`, data, {
          withCredentials: true,
        });
      }
      fetchReviews();
    } catch (err) {
      console.error("Error saving feedback:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/review/${id}`, {
        withCredentials: true,
      });
      fetchReviews();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const filtered = reviews.filter(
    (r) =>
      r.propertyId?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tenant Reviews</h1>

        {/* Search + Add */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search property or comment..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <MessageSquarePlus className="w-5 h-5" />
            Add Feedback
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["Property", "Rating", "Comment", "Date", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">{r.property}</td>
                  <td className="px-6 py-4">
                    <RatingStars rating={r.rating} />
                  </td>
                  <td className="px-6 py-4 text-gray-700 italic">{r.comment}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => {
                        setEditData(r);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-600 hover:underline font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No feedback found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
