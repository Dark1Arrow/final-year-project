"use client"
import React, { useState } from 'react';
import { Search, Star, User, Home, Calendar, Eye, Edit, MessageSquarePlus } from 'lucide-react';

const initialReviews = [
  { id: 1001, tenant: 'Jhon', property: 'Tenant #22', rating: 4, comment: 'Good service, quick response.', date: '27 Sep 2025' },
  { id: 1002, tenant: 'Alice', property: 'Flat #21', rating: 3, comment: 'Property is well maintained.', date: '27 Sep 2025' },
];

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 transition-colors duration-200 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-100'}`}
        />
      ))}
    </div>
  );
};

const FeedbackModal = ({ isOpen, onClose, initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    property: '',
    rating: 0,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {initialData ? 'Edit Feedback' : 'Add New Feedback'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
              <select
                name="property"
                value={formData.property}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select Property</option>
                <option value="Tenant #22">Tenant #22</option>
                <option value="Flat #21">Flat #21</option>
                <option value="Villa #9">Villa #9</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <Star 
                      key={i} 
                      className={`w-7 h-7 cursor-pointer transition-colors duration-200 ${ratingValue <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-100 hover:text-yellow-300 hover:fill-yellow-300'}`}
                      onClick={() => handleRatingChange(ratingValue)}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={formData.comment}
                onChange={handleChange}
                required
                placeholder="Share your feedback..."
                className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-xl shadow-md hover:bg-gray-300 transition duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 font-medium"
              >
                {initialData ? 'Save Changes' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



const MobileReviewCard = ({ review, handleEdit }) => {
  return (
    <div className="bg-white p-5 mb-4 rounded-xl shadow-lg border border-gray-100 md:hidden">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          {review.property}
        </h3>
        <RatingStars rating={review.rating} />
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-400" />
            <span className="font-medium">User ID:</span>
            <span className="ml-1 text-gray-900 font-bold">{review.id}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-orange-400" />
            <span className="ml-1 text-gray-900">{review.date}</span>
          </div>
        </div>
        
        <p className="border-t pt-3 mt-3 text-base italic text-gray-800">
          "{review.comment}"
        </p>
      </div>

      <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
        <button
          onClick={() => handleEdit(review)}
          className="p-2 rounded-full transition-colors duration-200 text-gray-600 hover:bg-gray-100"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null); 

  const handleEdit = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const handleSubmitFeedback = (newFeedback) => {
    if (editingReview) {
     
      console.log('Editing feedback:', editingReview.id, newFeedback);
      setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...newFeedback, date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) } : r));
    } else {
    
      console.log('Adding new feedback:', newFeedback);
      const newId = Math.max(...reviews.map(r => r.id)) + 1;
      setReviews([...reviews, { 
        id: newId, 
        tenant: 'Current User', 
        date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...newFeedback 
      }]);
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.id.toString().includes(searchTerm) ||
    review.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.tenant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          Tenant Reviews
        </h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3 sm:gap-4">
            <div className="flex-grow sm:flex-grow-0 max-w-sm w-full relative">
                <input
                    type="text"
                    placeholder="Search by ID / Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 transition-shadow duration-300"
                />
            </div>
            <button
                onClick={handleAdd}
                className="w-full sm:w-auto items-center px-6 py-3 text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium flex justify-center"
            >
                <MessageSquarePlus className="w-5 h-5 mr-2" />
                Add Feedback
            </button>
        </div>


        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            
            <thead className="bg-gray-50">
              <tr>
                {['User ID', 'Tenant', 'Property', 'Rating', 'Comment', 'Date', 'Action'].map((header) => (
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
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {review.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {review.tenant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {review.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <RatingStars rating={review.rating} />
                  </td>
                  <td className="px-6 py-4 max-w-xs text-sm text-gray-700 italic">
                    "{review.comment}"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {review.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(review)}
                        aria-label="Edit Review"
                        className="p-2 rounded-full transition-colors duration-200 text-gray-600 hover:bg-gray-100"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">No reviews found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredReviews.map((review) => (
            <MobileReviewCard 
                key={review.id} 
                review={review} 
                handleEdit={handleEdit} 
            />
          ))}
          {filteredReviews.length === 0 && (
             <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-lg">No reviews found matching your search.</div>
          )}
        </div>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingReview}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default App;