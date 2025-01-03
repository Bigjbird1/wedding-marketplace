import React, { useState } from 'react';
import { Search, Filter, Sliders, X, Check, ChevronDown, DollarSign } from 'lucide-react';

const MarketplaceSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  const conditions = [
    'New with tags',
    'New without tags',
    'Like new',
    'Good',
    'Fair'
  ];

  const sizes = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20'];
  
  const styles = [
    'A-Line',
    'Ball Gown',
    'Mermaid',
    'Sheath',
    'Tea Length',
    'Mini',
    'Empire Waist'
  ];

  const toggleFilter = (type, value) => {
    switch(type) {
      case 'size':
        setSelectedSizes(prev => 
          prev.includes(value) 
            ? prev.filter(size => size !== value)
            : [...prev, value]
        );
        break;
      case 'condition':
        setSelectedConditions(prev => 
          prev.includes(value)
            ? prev.filter(condition => condition !== value)
            : [...prev, value]
        );
        break;
      case 'style':
        setSelectedStyles(prev => 
          prev.includes(value)
            ? prev.filter(style => style !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedConditions([]);
    setSelectedStyles([]);
    setPriceRange([0, 5000]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search wedding dresses, decor, and more..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="px-4 py-2 border rounded-lg hover:border-gray-300 flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Active Filters */}
          {(selectedSizes.length > 0 || selectedConditions.length > 0 || selectedStyles.length > 0) && (
            <div className="flex items-center gap-2 py-4 overflow-x-auto">
              {selectedSizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleFilter('size', size)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm group"
                >
                  Size {size}
                  <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
              {selectedConditions.map(condition => (
                <button
                  key={condition}
                  onClick={() => toggleFilter('condition', condition)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm group"
                >
                  {condition}
                  <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
              {selectedStyles.map(style => (
                <button
                  key={style}
                  onClick={() => toggleFilter('style', style)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm group"
                >
                  {style}
                  <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Options */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Min Price</label>
                        <div className="relative mt-1">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full pl-8 pr-4 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Max Price</label>
                        <div className="relative mt-1">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full pl-8 pr-4 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <h3 className="font-medium mb-4">Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleFilter('size', size)}
                          className={`p-2 rounded-lg text-sm border ${
                            selectedSizes.includes(size)
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <h3 className="font-medium mb-4">Condition</h3>
                    <div className="space-y-2">
                      {conditions.map(condition => (
                        <button
                          key={condition}
                          onClick={() => toggleFilter('condition', condition)}
                          className={`w-full p-2 rounded-lg text-sm text-left ${
                            selectedConditions.includes(condition)
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <h3 className="font-medium mb-4">Style</h3>
                    <div className="space-y-2">
                      {styles.map(style => (
                        <button
                          key={style}
                          onClick={() => toggleFilter('style', style)}
                          className={`w-full p-2 rounded-lg text-sm text-left ${
                            selectedStyles.includes(style)
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t">
                <div className="flex gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
                  >
                    Show results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-3">
                <img 
                  src={`/api/placeholder/400/400?text=Item-${index + 1}`}
                  alt={`Item ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-medium group-hover:text-gray-600">Wedding Item</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-medium">$1,200</span>
                <span className="text-sm text-gray-500 line-through">$3,500</span>
              </div>
              <p className="text-sm text-gray-600">Size 6 • San Francisco</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSearch;
