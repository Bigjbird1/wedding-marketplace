import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordRecovery from '../password-recovery';

describe('PasswordRecovery', () => {
  it('renders initial request password reset form', () => {
    render(<PasswordRecovery />);

    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Send Reset Link')).toBeInTheDocument();
  });

  it('shows verification screen after submitting email', async () => {
    render(<PasswordRecovery />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Send Reset Link');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Check your email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows password reset form after clicking verification link', async () => {
    render(<PasswordRecovery />);

    // Navigate to reset password step
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Send Reset Link');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Click the simulated email verification link
    const openEmailButton = await screen.findByText('Open Email App');
    fireEvent.click(openEmailButton);

    expect(screen.getByText('Set new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm new password')).toBeInTheDocument();
  });

  it('toggles password visibility in reset form', async () => {
    render(<PasswordRecovery />);

    // Navigate to reset password step
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send Reset Link'));

    const openEmailButton = await screen.findByText('Open Email App');
    fireEvent.click(openEmailButton);

    // Test password visibility toggle
    const passwordInput = screen.getByPlaceholderText('Enter new password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButtons = screen.getAllByRole('button').filter(button => 
      button.className.includes('absolute right-3')
    );
    fireEvent.click(toggleButtons[0]);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('validates matching passwords before submission', async () => {
    render(<PasswordRecovery />);

    // Navigate to reset password step
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send Reset Link'));

    const openEmailButton = await screen.findByText('Open Email App');
    fireEvent.click(openEmailButton);

    // Fill in passwords
    const newPasswordInput = screen.getByPlaceholderText('Enter new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm new password');

    fireEvent.change(newPasswordInput, { target: { value: 'newpass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpass123' } });

    const resetButton = screen.getByText('Reset Password');
    expect(resetButton).not.toBeDisabled();
  });
});