import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, Calendar, MapPin, Package, ShoppingBag, ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import AuthModal from '@/components/ui/auth-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from '@/components/ui/login-modal';

const Homepage = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchDate, setSearchDate] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [, setLocation] = useLocation();
  const { user } = useUser();

  // If user is logged in, redirect to account management
  if (user) {
    setLocation('/account');
    return null;
  }

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchDate) params.append('date', searchDate);
    if (searchLocation) params.append('location', searchLocation);
    setLocation(`/search?${params.toString()}`);
  };

  const navigateToMarketplace = () => {
    setLocation('/marketplace');
  };

  const handleSignup = () => {
    setLocation('/profile-setup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              onClick={() => setLocation('/')}
              className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            >
              WeddingTransfer
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setLocation('/list')}
                className="text-gray-500 hover:text-gray-900"
              >
                List your date
              </button>
              {user && (
                <button 
                  onClick={() => setLocation('/messages')}
                  className="text-gray-500 hover:text-gray-900 flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  Messages
                </button>
              )}
              <button 
                onClick={navigateToMarketplace}
                className="text-gray-500 hover:text-gray-900 flex items-center gap-1"
              >
                <ShoppingBag className="w-4 h-4" />
                Marketplace
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                  Tools <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLocation('/reviews')}>
                    Reviews
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/payment')}>
                    Payment Demo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/analytics')}>
                    Analytics Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/transfer-verification')}>
                    Transfer Verification
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/enhanced-transfer')}>
                    Enhanced Transfer Verification
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/documents')}>
                    Document Storage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/password-recovery')}>
                    Password Recovery
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/admin-verification')}>
                    Admin Verification
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Log in
              </button>
              <button 
                onClick={handleSignup}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 leading-tight tracking-tight">
            <span className="block text-5xl sm:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 tracking-tight">
              Wedding Dates
            </span>
            <span className="block text-5xl sm:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 tracking-tight">
              Made Simple
            </span>
            <span className="block font-light text-4xl sm:text-5xl mt-4 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Buy With Confidence · Sell With Ease
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            The modern marketplace for wedding dates and packages
          </p>

          {/* Search Component */}
          <div className={`relative ${isSearchFocused ? 'shadow-2xl' : 'shadow-lg'} transition-shadow duration-200`}>
            <div className="bg-white rounded-full p-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="When's your perfect date?"
                  className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex-1 flex items-center gap-2 px-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Where?"
                  className="w-full py-3 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-full hover:opacity-90 transition-opacity"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-12">
            <div className="text-center">
              <div className="text-3xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                30-40%
              </div>
              <div className="text-gray-600 mt-1">
                average savings on packages
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-600 mt-1">
                secure transfers with support
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                5,000+
              </div>
              <div className="text-gray-600 mt-1">
                couples found their date
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Dates Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured dates</h2>
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              View all dates
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                venue: "Garden Estate Wedding",
                location: "San Francisco, CA",
                price: 15000,
                originalPrice: 22000,
                date: "Sep 24, 2024",
                guests: 150,
                image: "https://cdn.shopify.com/s/files/1/0582/0761/5695/files/garden-wedding-venues.jpg"
              },
              {
                venue: "Beachfront Resort",
                location: "Malibu, CA",
                price: 18000,
                originalPrice: 25000,
                date: "Oct 15, 2024",
                guests: 200,
                image: "https://placehold.co/800x450/9333ea/ffffff/ffffff/png?text=Beachfront+Wedding+Property"
              },
              {
                venue: "Historic Vineyard",
                location: "Napa Valley, CA",
                price: 12000,
                originalPrice: 19000,
                date: "Nov 5, 2024",
                guests: 120,
                image: "https://placehold.co/800x450/9333ea/ffffff/ffffff/png?text=Wedding+at+a+Vineyard"
              }
            ].map((item) => (
              <div
                key={item.venue}
                onClick={() => setLocation(`/listing/${encodeURIComponent(item.venue)}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="aspect-[16/9] relative">
                  <img 
                    src={item.image}
                    alt={item.venue}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-black/30 rounded-full text-sm text-white backdrop-blur-sm">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{item.venue}</h3>
                      <p className="text-gray-600">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${item.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{item.date}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{item.guests} guests</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Preview Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Wedding Marketplace</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover pre-loved wedding items, decor, and more at incredible prices
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                name: "Dresses", 
                details: "Save up to 60%",
                image: "https://placehold.co/400x400/9333ea/ffffff/png?text=Elegant+Wedding+Dress+Collection"
              },
              { 
                name: "Decor", 
                details: "From $20",
                image: "https://placehold.co/400x400/9333ea/ffffff/png?text=Luxury+Wedding+Decor+Items"
              },
              { 
                name: "Accessories", 
                details: "Like-new condition",
                image: "https://placehold.co/400x400/9333ea/ffffff/png?text=Wedding+Accessories+and+Jewelry"
              },
              { 
                name: "More", 
                details: "Browse all items",
                image: "https://placehold.co/400x400/9333ea/ffffff/png?text=Wedding+Planning+Essentials"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={navigateToMarketplace}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="aspect-square relative">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-medium text-lg">{item.name}</h3>
                    <p className="text-white/90 text-sm">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={navigateToMarketplace}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              Explore marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust/Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="font-medium mb-2">Flexible Dates</h3>
              <p className="text-gray-600 text-sm">Find and transfer wedding dates that work for you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-medium mb-2">Complete Packages</h3>
              <p className="text-gray-600 text-sm">Everything you need for your perfect day</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-medium mb-2">Wedding Marketplace</h3>
              <p className="text-gray-600 text-sm">Find amazing deals on pre-loved items</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Call-to-Action Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-4">Ready to find your perfect wedding date?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of couples who've found their dream wedding date through WeddingTransfer
          </p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Homepage;