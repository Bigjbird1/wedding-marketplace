import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { RecentlyViewedProvider, useRecentlyViewed } from '../use-recently-viewed';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useRecentlyViewed Hook', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('provides context values', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    expect(result.current.items).toEqual([]);
    expect(typeof result.current.addItem).toBe('function');
    expect(typeof result.current.clearItems).toBe('function');
  });

  it('throws error when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useRecentlyViewed());
    }).toThrow('useRecentlyViewed must be used within a RecentlyViewedProvider');

    consoleSpy.mockRestore();
  });

  it('initializes with empty items', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    expect(result.current.items).toEqual([]);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('recently_viewed');
  });

  it('adds new items correctly', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    const newItem = {
      id: '1',
      name: 'Test Item',
      price: 100,
      image: '/test.jpg',
      path: '/test/1'
    };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject(newItem);
    expect(result.current.items[0].timestamp).toBeDefined();
    expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('prevents duplicate items', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    const item = {
      id: '1',
      name: 'Test Item',
      price: 100,
      image: '/test.jpg',
      path: '/test/1'
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('maintains correct order (most recent first)', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'First Item',
        price: 100,
        image: '/test1.jpg',
        path: '/test/1'
      });
    });

    vi.advanceTimersByTime(1000);

    act(() => {
      result.current.addItem({
        id: '2',
        name: 'Second Item',
        price: 200,
        image: '/test2.jpg',
        path: '/test/2'
      });
    });

    expect(result.current.items[0].name).toBe('Second Item');
    expect(result.current.items[1].name).toBe('First Item');
  });

  it('limits the number of items', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    // Add 11 items (MAX_ITEMS + 1)
    Array.from({ length: 11 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
      price: 100 * i,
      image: `/test${i}.jpg`,
      path: `/test/${i}`
    })).forEach(item => {
      act(() => {
        result.current.addItem(item);
      });
    });

    expect(result.current.items).toHaveLength(10); // MAX_ITEMS
    expect(result.current.items[0].name).toBe('Item 10'); // Most recent item
  });

  it('clears all items', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Test Item',
        price: 100,
        image: '/test.jpg',
        path: '/test/1'
      });
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearItems();
    });

    expect(result.current.items).toHaveLength(0);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('recently_viewed');
  });

  it('persists items to localStorage', () => {
    const { result } = renderHook(() => useRecentlyViewed(), {
      wrapper: RecentlyViewedProvider
    });

    const item = {
      id: '1',
      name: 'Test Item',
      price: 100,
      image: '/test.jpg',
      path: '/test/1'
    };

    act(() => {
      result.current.addItem(item);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'recently_viewed',
      expect.stringContaining('"name":"Test Item"')
    );
  });
});