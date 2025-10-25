"use client";
import React, { useEffect, useState } from "react";
import { Search, Star, Zap, User, Home, MessageSquare, Loader2 } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/app/api/constants";

const RatingStars = ({ rating }) => (
  <div className="flex space-x-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const MobileReviewCard = ({ review }) => (
  <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
    <div className="flex items-center justify-between border-b pb-2 mb-2">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        {review.tenantName}
      </h3>
      <span className="text-sm text-gray-500">{review.date}</span>
    </div>

    <div className="grid grid-cols-1 gap-y-3 text-sm text-gray-600">
      <div className="flex items-center">
        <Home className="w-4 h-4 mr-2 text-green-400" />
        <span className="font-medium">Property:</span>
        <span className="ml-1 text-gray-900 truncate">{review.propertyName}</span>
      </div>

      <div className="flex items-center">
        <span className="font-medium">Rating:</span>
        <span className="ml-2">
          <RatingStars rating={review.rating} />
        </span>
      </div>

      <div className="border-t pt-3 mt-3">
        <div className="flex items-start text-gray-800">
          <MessageSquare className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-purple-500" />
          <p className="italic text-base leading-snug">"{review.comment}"</p>
        </div>
      </div>
    </div>
  </div>
);

const LandlordReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        // Fetch landlord properties
        const { data: propertyRes } = await axios.get(
          `${API_BASE_URL}/api/v1/property/ownerProperty`,
          { withCredentials: true }
        );

        const properties = propertyRes?.data || [];
        const allReviews = [];

        // Fetch reviews for each property
        for (const prop of properties) {
          const { data: reviewRes } = await axios.get(
            `${API_BASE_URL}/api/v1/review/get/${prop._id}`,
            { withCredentials: true }
          );

          const reviewsData = reviewRes?.data || [];
          for (const r of reviewsData) {
            // Fetch user (tenant) info
            const { data: userRes } = await axios.get(
              `${API_BASE_URL}/api/v1/users/${r.user}`,
              { withCredentials: true }
            );
            const user = userRes?.data || {};

            allReviews.push({
              id: r._id,
              tenantName: user.fullname || "Unknown",
              tenantEmail: user.email || "",
              propertyName: prop.name || prop.address || "Unnamed Property",
              rating: r.rating,
              comment: r.comment,
              date: new Date(r.createdAt).toLocaleDateString(),
            });
          }
        }

        setReviews(allReviews);
      } catch (error) {
        console.error("❌ Error fetching landlord reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(
    (r) =>
      r.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-blue-500" />
          Landlord Property Reviews
        </h1>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="flex-grow max-w-lg relative">
            <input
              type="text"
              placeholder="Search by tenant or property name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition-shadow duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Tenant", "Email", "Property", "Rating", "Comment", "Date"].map((header) => (
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
                  {filteredReviews.map((r) => (
                    <tr key={r.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.tenantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.tenantEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.propertyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <RatingStars rating={r.rating} />
                      </td>
                      <td className="px-6 py-4 max-w-xs text-sm text-gray-700 italic">
                        "{r.comment}"
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.date}
                      </td>
                    </tr>
                  ))}
                  {filteredReviews.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500">
                        No reviews found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 mt-6">
              {filteredReviews.map((review) => (
                <MobileReviewCard key={review.id} review={review} />
              ))}
              {filteredReviews.length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-lg">
                  No reviews found matching your search.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LandlordReviewPage;
