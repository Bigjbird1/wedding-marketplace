import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminVerification from '../admin-verification';

describe('AdminVerification', () => {
  it('renders the header and initial state', () => {
    render(<AdminVerification />);
    
    expect(screen.getByText('Identity Verification')).toBeInTheDocument();
    expect(screen.getByText('Review Next')).toBeInTheDocument();
  });

  it('shows pending applications by default', () => {
    render(<AdminVerification />);
    
    expect(screen.getByText('Pending Review')).toHaveClass('bg-yellow-100', 'text-yellow-800');
    expect(screen.getByText('Sarah Mitchell')).toBeInTheDocument();
  });

  it('allows switching between status filters', () => {
    render(<AdminVerification />);
    
    const approvedButton = screen.getByText('Approved');
    fireEvent.click(approvedButton);
    
    expect(approvedButton).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('shows application details when selecting an application', () => {
    render(<AdminVerification />);
    
    const application = screen.getByText('Sarah Mitchell');
    fireEvent.click(application);
    
    expect(screen.getByText('Submitted Documents')).toBeInTheDocument();
    expect(screen.getAllByText('View Full Size')).toHaveLength(2);
  });
});
