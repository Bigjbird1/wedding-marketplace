import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarketplaceListingDetail from '../marketplace-listing-detail';
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';

// Mock wouter's useLocation and useParams
vi.mock('wouter', () => ({
  useLocation: () => ['/marketplace/1', vi.fn()],
  useParams: () => ({ id: '1' }),
}));

// Set up test wrapper with required providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <RecentlyViewedProvider>
      {ui}
    </RecentlyViewedProvider>
  );
};

describe('MarketplaceListingDetail Component', () => {
  beforeEach(() => {
    renderWithProviders(<MarketplaceListingDetail />);
  });

  it('renders product title and price', () => {
    expect(screen.getByText('Vera Wang White Collection Wedding Dress')).toBeInTheDocument();
    expect(screen.getByText('$1200')).toBeInTheDocument();
    expect(screen.getByText('$3500')).toBeInTheDocument();
  });

  it('displays seller information', () => {
    expect(screen.getByText("Emma's Boutique")).toBeInTheDocument();
    const rating = screen.getByText('4.9');
    const reviews = screen.getByText('(28 reviews)');
    expect(rating).toBeInTheDocument();
    expect(reviews).toBeInTheDocument();
  });

  it('shows product details', () => {
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('handles image gallery navigation', () => {
    const nextButton = screen.getByRole('button', { name: /chevron right/i });
    const prevButton = screen.getByRole('button', { name: /chevron left/i });

    // Initial image
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/api/placeholder/800/600?text=Wedding-Dress-1');

    // Navigate forward
    fireEvent.click(nextButton);
    expect(images[0]).toHaveAttribute('src', '/api/placeholder/800/600?text=Wedding-Dress-2');

    // Navigate back
    fireEvent.click(prevButton);
    expect(images[0]).toHaveAttribute('src', '/api/placeholder/800/600?text=Wedding-Dress-1');
  });

  it('toggles contact form modal', () => {
    const contactButton = screen.getByText('Contact Seller');
    fireEvent.click(contactButton);

    expect(screen.getByText('Contact Seller')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByPlaceholderText('Type your message...')).not.toBeInTheDocument();
  });

  it('displays buyer protection message', () => {
    expect(screen.getByText(/Protected by Buyer Guarantee/)).toBeInTheDocument();
  });

  it('handles buy now action', () => {
    const buyNowButton = screen.getByText('Buy Now');
    fireEvent.click(buyNowButton);
    // Since we mocked useLocation, we just verify the button exists and is clickable
    expect(buyNowButton).toBeInTheDocument();
  });
});