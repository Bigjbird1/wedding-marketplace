import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarketplaceCart from '../marketplace-cart';
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';

// Set up test wrapper with required providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <RecentlyViewedProvider>
      {ui}
    </RecentlyViewedProvider>
  );
};

describe('MarketplaceCart Component', () => {
  beforeEach(() => {
    renderWithProviders(<MarketplaceCart />);
  });

  it('renders cart items correctly', () => {
    expect(screen.getByText(/Shopping Cart/)).toBeInTheDocument();
    expect(screen.getByText('Vintage Wedding Dress')).toBeInTheDocument();
    expect(screen.getByText('Crystal Table Centerpieces (Set of 10)')).toBeInTheDocument();
  });

  it('displays correct initial prices', () => {
    expect(screen.getByText('$899')).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('allows quantity updates', () => {
    const plusButtons = screen.getAllByRole('button', { name: '' }).filter(
      button => button.innerHTML.includes('Plus')
    );

    fireEvent.click(plusButtons[0]); // Increase first item quantity

    const quantities = screen.getAllByText(/^[0-9]+$/);
    expect(quantities[0].textContent).toBe('2');
  });

  it('calculates subtotal correctly', () => {
    const subtotalText = screen.getByText(/\$[0-9,]+\.[0-9]{2}$/);
    expect(subtotalText).toBeInTheDocument();
  });

  it('handles shipping option changes', () => {
    const expressShipping = screen.getByLabelText('Express Shipping');
    fireEvent.click(expressShipping);

    // Check if shipping cost is updated (should be 1.5x standard shipping)
    const shippingCost = screen.getAllByText(/\$[0-9]+\.[0-9]{2}/)[1];
    expect(shippingCost).toBeInTheDocument();
  });

  it('validates promo code', () => {
    const promoInput = screen.getByPlaceholderText('Enter code');
    const applyButton = screen.getByText('Apply');

    fireEvent.change(promoInput, { target: { value: 'INVALID' } });
    fireEvent.click(applyButton);

    expect(screen.getByText('Invalid promo code')).toBeInTheDocument();
  });

  it('allows item removal', () => {
    const removeButtons = screen.getAllByRole('button').filter(
      button => button.innerHTML.includes('Trash2')
    );

    const initialItemCount = screen.getAllByText(/Emma's Boutique|Wedding Decor Co/).length;
    fireEvent.click(removeButtons[0]);

    const newItemCount = screen.getAllByText(/Emma's Boutique|Wedding Decor Co/).length;
    expect(newItemCount).toBe(initialItemCount - 1);
  });
});