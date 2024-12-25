import React, { useState, useEffect, useCallback } from 'react';
import { MapPin } from 'lucide-react';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

const POPULAR_LOCATIONS = [
  'San Francisco, CA',
  'Los Angeles, CA',
  'New York, NY',
  'Miami, FL',
  'Las Vegas, NV',
  'Chicago, IL',
  'Austin, TX',
  'Nashville, TN'
];

export function LocationAutocomplete({
  value,
  onChange,
  onFocus,
  onBlur
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions(POPULAR_LOCATIONS);
      return;
    }

    setLoading(true);
    try {
      const filtered = POPULAR_LOCATIONS.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      // Include the user's custom input if it doesn't match any suggestions
      if (filtered.length === 0 && query.trim().length > 0) {
        filtered.push(query);
      }
      setSuggestions(filtered);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useDebounce(fetchSuggestions, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsOpen(true);
    onFocus?.();
    if (!value) setSuggestions(POPULAR_LOCATIONS);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedFetchSuggestions(newValue);
  };

  const handleSelect = (location: string) => {
    onChange(location);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 px-4" ref={containerRef}>
      <div className="relative flex items-center">
        <MapPin className="absolute left-0 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          placeholder="Where?"
          className="w-full py-3 pl-8 focus:outline-none text-gray-900 placeholder-gray-500 text-lg font-light"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border py-2 z-50">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <div>
              {!value && (
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-500 font-medium">POPULAR LOCATIONS</p>
                </div>
              )}
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(location)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-gray-500">Enter any location</div>
          )}
        </div>
      )}
    </div>
  );
}

export default LocationAutocomplete;