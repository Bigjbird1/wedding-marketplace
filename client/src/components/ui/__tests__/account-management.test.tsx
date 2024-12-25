import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountManagement from '../account-management';

describe('AccountManagement Component', () => {
  beforeEach(() => {
    render(<AccountManagement />);
  });

  it('renders main header', () => {
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('shows profile tab by default', () => {
    expect(screen.getByText('Profile Photo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    // Initial state - Profile tab
    expect(screen.getByText('Profile Photo')).toBeInTheDocument();

    // Click Security tab
    fireEvent.click(screen.getByText('Security'));
    expect(screen.getByText('Keep your account secure by using a strong password and enabling two-factor authentication.')).toBeInTheDocument();

    // Click Notifications tab
    fireEvent.click(screen.getByText('Notifications'));
    expect(screen.getByText('Email Notifications')).toBeInTheDocument();

    // Click Payment Methods tab
    fireEvent.click(screen.getByText('Payment Methods'));
    expect(screen.getByText('Add a new payment method')).toBeInTheDocument();
  });

  it('toggles password visibility in security tab', () => {
    // Navigate to Security tab
    fireEvent.click(screen.getByText('Security'));
    
    const passwordInput = screen.getByPlaceholderText('Enter current password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click show password button
    const showPasswordButton = screen.getAllByRole('button')[4]; // Get the eye icon button
    fireEvent.click(showPasswordButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('toggles notification settings', () => {
    // Navigate to Notifications tab
    fireEvent.click(screen.getByText('Notifications'));
    
    // Find and click the first toggle button
    const toggleButtons = screen.getAllByRole('button').filter(button => 
      button.className.includes('w-12 h-6 rounded-full transition-colors')
    );
    
    const firstToggle = toggleButtons[0];
    const initialState = firstToggle.className.includes('bg-gray-900');
    
    fireEvent.click(firstToggle);
    
    expect(firstToggle.className.includes('bg-gray-900')).toBe(!initialState);
  });
});
