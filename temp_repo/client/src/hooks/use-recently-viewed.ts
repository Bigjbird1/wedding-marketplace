import React from 'react';

export type RecentlyViewedItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  path: string;
  timestamp?: number;
};

type RecentlyViewedContextType = {
  items: RecentlyViewedItem[];
  addItem: (item: Omit<RecentlyViewedItem, 'timestamp'>) => void;
  clearItems: () => void;
};

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 10;

function getStoredItems(): RecentlyViewedItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const items = JSON.parse(stored);
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function storeItems(items: RecentlyViewedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to store recently viewed items:', error);
  }
}

const RecentlyViewedContext = React.createContext<RecentlyViewedContextType | null>(null);

RecentlyViewedContext.displayName = 'RecentlyViewedContext';

export function useRecentlyViewed(): RecentlyViewedContextType {
  const context = React.useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }

  return context;
}

type ProviderProps = {
  children: React.ReactNode;
};

export function RecentlyViewedProvider({ children }: ProviderProps) {
  const [items, setItems] = React.useState<RecentlyViewedItem[]>(() => getStoredItems());

  const addItem = React.useCallback((newItem: Omit<RecentlyViewedItem, 'timestamp'>) => {
    setItems(currentItems => {
      const itemWithTimestamp = {
        ...newItem,
        timestamp: Date.now()
      };

      // Remove any existing items with the same ID
      const filteredItems = currentItems.filter(item => item.id !== newItem.id);

      // Add the new item at the start and limit the total number
      const updatedItems = [itemWithTimestamp, ...filteredItems].slice(0, MAX_ITEMS);

      // Persist to localStorage
      storeItems(updatedItems);

      return updatedItems;
    });
  }, []);

  const clearItems = React.useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear recently viewed items:', error);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      items,
      addItem,
      clearItems,
    }),
    [items, addItem, clearItems]
  );

  return React.createElement(RecentlyViewedContext.Provider, { value }, children);
}