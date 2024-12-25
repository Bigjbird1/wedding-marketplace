import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SiteHeader } from '../site-header';
import { RecentlyViewedProvider } from '@/hooks/use-recently-viewed';

// Mock wouter's useLocation
const mockSetLocation = vi.fn();
vi.mock('wouter', () => ({
  useLocation: () => ['/', mockSetLocation],
}));

// Mock useUser hook
vi.mock('@/hooks/use-user', () => ({
  useUser: () => ({ user: null, isLoading: false }),
}));

describe('SiteHeader Component', () => {
  beforeEach(() => {
    render(
      <RecentlyViewedProvider>
        <SiteHeader />
      </RecentlyViewedProvider>
    );
    mockSetLocation.mockClear();
  });

  it('renders main navigation elements', () => {
    expect(screen.getByText('WeddingTransfer')).toBeInTheDocument();
    expect(screen.getByText('List your date')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('navigates to home when clicking logo', () => {
    fireEvent.click(screen.getByText('WeddingTransfer'));
    expect(mockSetLocation).toHaveBeenCalledWith('/');
  });

  it('navigates to listing page when clicking "List your date"', () => {
    fireEvent.click(screen.getByText('List your date'));
    expect(mockSetLocation).toHaveBeenCalledWith('/list');
  });

  it('navigates to marketplace when clicking "Marketplace"', () => {
    fireEvent.click(screen.getByText('Marketplace'));
    expect(mockSetLocation).toHaveBeenCalledWith('/marketplace');
  });

  it('opens tools dropdown when clicking "Tools"', () => {
    fireEvent.click(screen.getByText('Tools'));
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Payment Demo')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  it('navigates to login when clicking "Log in"', () => {
    fireEvent.click(screen.getByText('Log in'));
    expect(mockSetLocation).toHaveBeenCalledWith('/login');
  });

  it('navigates to profile setup when clicking "Sign up"', () => {
    fireEvent.click(screen.getByText('Sign up'));
    expect(mockSetLocation).toHaveBeenCalledWith('/profile-setup');
  });
});
