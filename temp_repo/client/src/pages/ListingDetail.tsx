import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Clock, Heart, Share, ChevronLeft, ChevronRight,
  MessageCircle, Shield, DollarSign, CalendarCheck, FileText
} from 'lucide-react';

interface Listing {
  title: string;
  date: string;
  timeOfDay: string;
  location: string;
  originalPrice: number;
  askingPrice: number;
  guestCapacity: number;
  description: string;
  images: string[];
  includedServices: string[];
  amenities: string[];
  transferPolicy: string;
  seller: {
    name: string;
    memberSince: string;
    responseRate: string;
  };
}

const ListingDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock data - would come from props/API
  const listing: Listing = {
    title: "Garden Wedding Package at The Grand Estate",
    date: "2024-09-24",
    timeOfDay: "Evening (4PM - 8PM)",
    location: "San Francisco, CA",
    originalPrice: 22000,
    askingPrice: 15000,
    guestCapacity: 150,
    description: "Beautiful garden wedding package including venue rental, catering for 150 guests, basic decor, and staffing. The Grand Estate features stunning gardens, a historic mansion, and modern amenities.",
    images: [
      "/api/placeholder/800/500?text=Garden-View",
      "/api/placeholder/800/500?text=Reception-Hall",
      "/api/placeholder/800/500?text=Ceremony-Space",
      "/api/placeholder/800/500?text=Dining-Area"
    ],
    includedServices: [
      "Venue rental (6 hours)",
      "Catering (appetizers, main course, dessert)",
      "Basic floral arrangements",
      "Tables and chairs",
      "Setup and cleanup",
      "Event coordinator",
      "Security staff",
      "Parking attendants"
    ],
    amenities: [
      "Bridal suite",
      "Groom's room",
      "Commercial kitchen",
      "Ample parking",
      "Wheelchair accessible",
      "Climate controlled",
      "Backup generator",
      "Sound system"
    ],
    transferPolicy: "Full transfer of all services and amenities. Original contract and deposit will be transferred to the new couple after verification.",
    seller: {
      name: "Sarah & Michael",
      memberSince: "2023",
      responseRate: "98%"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-100">
        <img 
          src={listing.images[currentImageIndex]}
          alt={`Venue view ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
          disabled={currentImageIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentImageIndex(prev => Math.min(listing.images.length - 1, prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
          disabled={currentImageIndex === listing.images.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 justify-center">
            {listing.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 rounded-full bg-white/90 hover:bg-white">
            <Share className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-white/90 hover:bg-white">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-semibold mb-4">{listing.title}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(listing.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{listing.timeOfDay}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>Up to {listing.guestCapacity} guests</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About This Package</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.includedServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Venue Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Transfer Policy</h2>
              <p className="text-gray-600">{listing.transferPolicy}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl border p-6 sticky top-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-semibold">${listing.askingPrice.toLocaleString()}</p>
                    <p className="text-gray-500 line-through">${listing.originalPrice.toLocaleString()}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                    {Math.round((1 - listing.askingPrice / listing.originalPrice) * 100)}% off
                  </span>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  {/* Protected Payment Badge */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">Protected payments & transfers</span>
                  </div>
                  {/* Quick Stats */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarCheck className="w-5 h-5" />
                    <span className="text-sm">Available immediately</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm">Transfer policy verified</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
                >
                  Contact Seller
                </button>
                
                <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
                  Make an Offer
                </button>
              </div>
            </div>

            {/* Seller Card */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  {listing.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{listing.seller.name}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Member since {listing.seller.memberSince}</p>
                    <p>{listing.seller.responseRate} response rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full border rounded-lg p-2"
                  placeholder="Tell the seller what you'd like to know..."
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
