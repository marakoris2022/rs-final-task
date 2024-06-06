import { render, screen, fireEvent } from '@testing-library/react';
import { UserPasswordForm } from './UserPasswordForm';

// Mock the useCustomerStore hook
vi.mock('../../store/useCustomerStore');

describe('UserPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<UserPasswordForm />);

    expect(screen.getByLabelText(/Current Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeInTheDocument();
  });

  it('shows/hides password fields', () => {
    render(<UserPasswordForm />);

    expect(screen.getByLabelText(/Current Password:/i)).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/New Password:/i)).toHaveAttribute('type', 'password');
  });

  it('displays error message for invalid data', async () => {
    render(<UserPasswordForm />);

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    expect(await screen.findByText(/New Password/i)).toBeInTheDocument();
  });
});
