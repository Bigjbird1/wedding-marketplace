import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewsSystem from '../reviews-system';
import userEvent from '@testing-library/user-event';

describe('ReviewsSystem', () => {
  it('renders the review stats section', () => {
    render(<ReviewsSystem />);

    expect(screen.getByText('Overall Rating')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Verified Reviews')).toBeInTheDocument();
  });

  it('allows switching between review categories', () => {
    render(<ReviewsSystem />);

    const sellerReviewsButton = screen.getByText('Seller Reviews');
    userEvent.click(sellerReviewsButton);

    expect(screen.getByText('Great seller, very responsive')).toBeInTheDocument();
  });

  it('displays review cards with correct information', () => {
    render(<ReviewsSystem />);

    const reviewCard = screen.getByText('Excellent transfer experience').closest('.bg-white') as HTMLElement; // cast to HTMLElement
    expect(reviewCard).toBeInTheDocument();

    within(reviewCard).getByText('Sarah M.');
    within(reviewCard).getByText('Verified', { exact: false });
    within(reviewCard).getByText('transfer', { exact: false });
  });

  it('shows report modal when clicking report button', () => {
    render(<ReviewsSystem />);

    // Find the first review card
    const reviewCard = screen.getByText('Excellent transfer experience').closest('.bg-white') as HTMLElement; // cast to HTMLElement
    expect(reviewCard).toBeInTheDocument();

    // Click the more options button within this review card
    const moreButton = within(reviewCard).getByRole('button', {
      name: /more/i,
    });
    userEvent.click(moreButton);

    expect(screen.getByText('Report Review')).toBeInTheDocument();
    expect(screen.getByText('Submit Report')).toBeInTheDocument();
  });
});
