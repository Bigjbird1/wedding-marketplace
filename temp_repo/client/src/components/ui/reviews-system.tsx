import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, MoreHorizontal, MessageSquare, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ReviewType = 'venue' | 'seller' | 'marketplace';

interface Review {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  type: 'transfer' | 'seller' | 'product';
  response?: {
    author: string;
    content: string;
    date: string;
  };
  images?: string[];
}

interface ReviewsSystemProps {
  initialTab?: ReviewType;
}

const ReviewsSystem: React.FC<ReviewsSystemProps> = ({ initialTab = 'venue' }) => {
  const [activeTab, setActiveTab] = useState<ReviewType>(initialTab);
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  
  // Mock data for different review types
  const reviews: Record<ReviewType, Review[]> = {
    venue: [
      {
        id: 1,
        rating: 5,
        title: "Excellent transfer experience",
        content: "The venue was extremely helpful in facilitating the transfer. They made the process smooth and were very communicative throughout.",
        author: "Sarah M.",
        date: "2024-02-15",
        verified: true,
        helpfulCount: 12,
        type: "transfer",
        response: {
          author: "The Grand Estate",
          content: "Thank you for the wonderful review, Sarah! We're glad we could help make the transfer process smooth.",
          date: "2024-02-16"
        }
      },
      {
        id: 2,
        rating: 4,
        title: "Good but some delays",
        content: "Transfer went through successfully but took longer than expected. Communication could have been better.",
        author: "Michael R.",
        date: "2024-02-10",
        verified: true,
        helpfulCount: 8,
        type: "transfer"
      }
    ],
    seller: [
      {
        id: 3,
        rating: 5,
        title: "Great seller, very responsive",
        content: "Emma was super helpful and provided all the necessary documentation quickly. Would definitely recommend!",
        author: "David L.",
        date: "2024-02-18",
        verified: true,
        helpfulCount: 15,
        type: "seller"
      }
    ],
    marketplace: [
      {
        id: 4,
        rating: 5,
        title: "Perfect condition dress",
        content: "The dress was exactly as described and in perfect condition. Seller was great with communication.",
        author: "Lisa K.",
        date: "2024-02-20",
        verified: true,
        helpfulCount: 10,
        type: "product",
        images: ["/api/placeholder/400/400?text=Wedding-Dress-1"]
      }
    ]
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-white rounded-xl border p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {renderStars(review.rating)}
            <h3 className="font-medium">{review.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{review.author}</span>
            {review.verified && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Verified {review.type}</span>
              </div>
            )}
            <span>•</span>
            <span>{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setSelectedReview(review);
            setShowReportModal(true);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {review.images && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <p className="text-gray-600 mb-4">{review.content}</p>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpfulCount})
        </button>
        <button 
          onClick={() => setShowReplyForm(review.id)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <MessageSquare className="w-4 h-4" />
          Reply
        </button>
      </div>

      {review.response && (
        <div className="mt-4 pl-4 border-l-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{review.response.author}</span>
            <span className="text-sm text-gray-600">
              {new Date(review.response.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{review.response.content}</p>
        </div>
      )}

      {showReplyForm === review.id && (
        <div className="mt-4 pl-4 border-l-2">
          <textarea
            placeholder="Write your response..."
            className="w-full p-3 border rounded-lg mb-2"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setShowReplyForm(null)}
              className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800">
              Submit Response
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Review Stats */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-semibold">4.8</div>
            <div className="flex justify-center mb-1">
              {renderStars(5)}
            </div>
            <div className="text-sm text-gray-600">Overall Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold">95%</div>
            <div className="text-sm text-gray-600">Verified Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold">127</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold">92%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('venue')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'venue'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Venue Reviews
        </button>
        <button
          onClick={() => setActiveTab('seller')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'seller'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Seller Reviews
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'marketplace'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Marketplace Reviews
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews[activeTab].map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Report Review</h3>
            
            <Alert className="mb-4">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Our moderation team will review this report within 24 hours.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Report</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Inappropriate content</option>
                  <option>Spam</option>
                  <option>False information</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Details</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                  placeholder="Please provide more information..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setSelectedReview(null);
                  }}
                  className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSystem;
