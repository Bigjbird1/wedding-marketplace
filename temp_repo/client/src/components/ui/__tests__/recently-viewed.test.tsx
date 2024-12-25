import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecentlyViewed } from '../recently-viewed';
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';

// Mock local storage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('RecentlyViewed Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  it('renders nothing when no items are viewed', () => {
    render(
      <RecentlyViewedProvider>
        <RecentlyViewed />
      </RecentlyViewedProvider>
    );

    expect(screen.queryByText('Recently Viewed')).not.toBeInTheDocument();
  });

  it('displays recently viewed items', () => {
    // Setup mock localStorage data
    const mockItems = [
      {
        id: '1',
        name: 'Test Item 1',
        price: 100,
        image: '/test-image-1.jpg',
        path: '/marketplace/1',
        timestamp: Date.now()
      },
      {
        id: '2',
        name: 'Test Item 2',
        price: 200,
        image: '/test-image-2.jpg',
        path: '/marketplace/2',
        timestamp: Date.now() - 1000
      }
    ];

    mockLocalStorage.setItem('recently_viewed', JSON.stringify(mockItems));

    render(
      <RecentlyViewedProvider>
        <RecentlyViewed />
      </RecentlyViewedProvider>
    );

    expect(screen.getByText('Recently Viewed')).toBeInTheDocument();
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('renders images correctly', () => {
    const mockItems = [
      {
        id: '1',
        name: 'Test Item 1',
        price: 100,
        image: '/test-image-1.jpg',
        path: '/marketplace/1',
        timestamp: Date.now()
      },
      {
        id: '2',
        name: 'Test Item 2',
        price: 200,
        image: '/test-image-2.jpg',
        path: '/marketplace/2',
        timestamp: Date.now() - 1000
      }
    ];

    mockLocalStorage.setItem('recently_viewed', JSON.stringify(mockItems));

    render(
      <RecentlyViewedProvider>
        <RecentlyViewed />
      </RecentlyViewedProvider>
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/test-image-1.jpg');
    expect(images[1]).toHaveAttribute('src', '/test-image-2.jpg');
  });

  it('limits the number of items displayed', () => {
    const manyItems = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Test Item ${i + 1}`,
      price: 100 * (i + 1),
      image: `/test-image-${i + 1}.jpg`,
      path: `/marketplace/${i + 1}`,
      timestamp: Date.now() - i * 1000
    }));

    mockLocalStorage.setItem('recently_viewed', JSON.stringify(manyItems));

    render(
      <RecentlyViewedProvider>
        <RecentlyViewed />
      </RecentlyViewedProvider>
    );

    // Should only show MAX_ITEMS (10) items
    const items = screen.getAllByRole('link');
    expect(items).toHaveLength(10);
  });
});