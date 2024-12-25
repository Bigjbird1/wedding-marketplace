import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, Filter, Heart, ChevronDown, ArrowUpDown, Shield, MessageCircle, Share, DollarSign, Truck, Bookmark } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getWeddingImages, preloadImages, type UnsplashImage } from '@/lib/unsplash';
import { useQuery } from '@tanstack/react-query';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { RecentlyViewed } from '@/components/ui/recently-viewed';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';

const PRICE_RANGES = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: '$2000+', min: 2000, max: undefined },
] as const;

type PriceRange = {
  min: number;
  max?: number;
};

const MarketplaceBrowse = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [, setLocation] = useLocation();
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({ min: 0, max: undefined });
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const { addItem } = useRecentlyViewed();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['marketplace-images'],
    queryFn: () => getWeddingImages(12),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    preloadImages('dress', 5);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'dresses', name: 'Wedding Dresses' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'decor', name: 'Decor' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'veils', name: 'Veils & Headpieces' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  const handleItemClick = (itemId: number) => {
    setLocation(`/marketplace/${itemId}`);
  };

  const toggleSaveItem = (itemId: number) => {
    setSavedItems(current => {
      const updated = new Set(current);
      if (updated.has(itemId)) {
        updated.delete(itemId);
      } else {
        updated.add(itemId);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-2">
            <BreadcrumbNav />
          </div>
          <div className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search wedding items..."
                className="w-full border rounded-lg pl-10 pr-4 py-3"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="py-3 flex items-center gap-4 overflow-x-auto">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedPriceRange({ min: range.min, max: range.max })}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="py-3 border-t flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
                Size
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
                Price Range
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:border-gray-300">
                Condition
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowUpDown className="w-4 h-4" />
              Sort by: Featured
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-3 gap-6">
            {['Designer Dresses', 'New Arrivals', 'Best Sellers'].map((collection, index) => (
              <div
                key={collection}
                onClick={() => setLocation(`/marketplace?collection=${encodeURIComponent(collection)}`)}
                className="aspect-[16/9] relative rounded-xl overflow-hidden group cursor-pointer"
              >
                {images[index] ? (
                  <img
                    src={images[index].url}
                    alt={images[index].description || collection}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-medium">{collection}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <RecentlyViewed />

        <div className="grid md:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          ) : (
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  handleItemClick(index + 1);
                  addItem({
                    id: index + 1,
                    name: `Wedding Item ${index + 1}`,
                    price: 1200,
                    image: `/api/placeholder/400/400?text=Item-${index + 1}`,
                    path: `/marketplace/${index + 1}`,
                  });
                }}
                className="group cursor-pointer"
              >
                <div className="aspect-square relative rounded-xl overflow-hidden mb-3">
                  <img
                    src={`/api/placeholder/400/400?text=Item-${index + 1}`}
                    alt={`Item ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(index + 1);
                      }}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedItems.has(index + 1) ? 'fill-gray-900' : ''
                        }`}
                      />
                    </button>
                    <button
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share
                      }}
                    >
                      <Share className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <span className="px-2 py-1 bg-black/30 text-white text-sm rounded-full backdrop-blur-sm">
                      Never Worn
                    </span>
                    <a
                      href={`https://unsplash.com/@${images[index]?.authorUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-white bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm"
                    >
                      Photo by {images[index]?.authorName}
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium group-hover:text-gray-600">
                    Wedding Dress Collection
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>Protected</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">$1,200</span>
                  <span className="text-sm text-gray-500 line-through">$3,500</span>
                  <span className="text-sm text-green-600">(65% off)</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Size 6</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Free Shipping
                    </span>
                  </div>
                  <button
                    className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(index + 1);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Load more items
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBrowse;