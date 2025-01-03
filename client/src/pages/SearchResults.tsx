import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, Calendar, MapPin, Filter, LayoutGrid, ChevronDown, Globe, ArrowUpDown, Bookmark, Heart } from 'lucide-react';

function SearchResults() {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false);
  const [mockResults] = useState([1, 2, 3, 4]);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Search Bar */}
          <div className="py-4 flex gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="text"
                  defaultValue="September 2024"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Select dates"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="relative flex-1">
                <input 
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="w-full p-3 pl-10 border rounded-lg"
                  placeholder="Location"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button 
                onClick={() => setSavedSearch(!savedSearch)}
                className={`p-2 rounded-lg border ${savedSearch ? 'text-purple-600 border-purple-200 bg-purple-50' : 'text-gray-400 hover:border-gray-300'}`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Header */}
          <div className="py-3 border-t flex items-center justify-between">
            {/* Quick Filters */}
            <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2">
              <button 
                onClick={() => setShowFilters(true)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 flex items-center gap-1"
              >
                <Filter className="w-3 h-3" />
                All Filters
              </button>
              <div className="h-4 w-px bg-gray-200"></div>
              <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                Under $15,000
              </button>
              <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                All-Inclusive
              </button>
              <button className="px-3 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                Under 100 guests
              </button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex border rounded-lg p-1">
                <button 
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <button className="hover:text-gray-900">Home</button>
              <span>›</span>
              <span>Search Results</span>
            </div>
            <h1 className="text-lg font-medium">28 wedding dates available in San Francisco</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="text-sm border-0 focus:ring-0 text-gray-600 font-medium cursor-pointer">
              <option>Best match</option>
              <option>Price: Low to high</option>
              <option>Price: High to low</option>
              <option>Date: Soonest</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 gap-8">
            {mockResults.map((item) => (
              <div
                key={item}
                onClick={() => setLocation(`/listing/${item}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="aspect-[16/9] relative">
                  <img 
                    src={`/api/placeholder/800/450?text=Luxury-Venue-${item}`}
                    alt="Venue"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-black/30 rounded-full text-sm text-white backdrop-blur-sm">
                      32% off
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">Garden Wedding Package</h3>
                      <p className="text-gray-600">San Francisco, CA</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">$15,000</div>
                      <div className="text-sm text-gray-500 line-through">$22,000</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Sep 24, 2024</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">150 guests</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <span>All-inclusive package with catering for up to 150 guests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <span>Indoor and outdoor ceremony spaces with garden views</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                      <span>6-hour venue rental including setup and cleanup</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-[600px] bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Map view coming soon</p>
            </div>
          </div>
        )}

        {/* Show More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 inline-flex items-center gap-2">
            Show more listings
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;