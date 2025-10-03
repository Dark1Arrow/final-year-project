"use client"
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; 

const StarRating = ({ rating }) => {
  const maxRating = 5;
  let stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  }

  return <div className="flex space-x-0.5">{stars}</div>;
};

const FeedbackTable = () => {
  const [feedbackData] = useState([
    {
      userId: '1001',
      role: 'Landlord',
      property: 'Tenant #22',
      rating: 4,
      comment: '"Late rent payment"',
      date: '27 Sep 2025',
    },
    {
      userId: '1001',
      role: 'Tenant',
      property: 'Flat #21',
      rating: 5,
      comment: '"Clean and well maintained"',
      date: '27 Sep 2025',
    },
    {
      userId: '1001',
      role: 'Landlord',
      property: 'Tenant #22',
      rating: 4,
      comment: '"Late rent payment"',
      date: '27 Sep 2025',
    },
    {
      userId: '1001',
      role: 'Landlord',
      property: 'Tenant #22',
      rating: 4,
      comment: '"Late rent payment"',
      date: '27 Sep 2025',
    },
    {
      userId: '1001',
      role: 'Landlord',
      property: 'Tenant #22',
      rating: 5,
      comment: '"Late rent payment"',
      date: '27 Sep 2025',
    },
    {
      userId: '1001',
      role: 'Landlord',
      property: 'Tenant #22',
      rating: 1,
      comment: '"Late rent payment"',
      date: '27 Sep 2025',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

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
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 shadow-md"
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
                  User ID
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Role
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Property
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Rating
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Comment
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
           
            <tbody className="bg-white divide-y divide-gray-100">
              {feedbackData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.userId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.property}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <StarRating rating={item.rating} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 italic">
                    {item.comment}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item.date}
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

export default FeedbackTable;