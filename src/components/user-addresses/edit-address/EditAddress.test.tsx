import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';
import { EditAddress } from './EditAddress';

vi.mock('../../../store/useCustomerStore');
vi.mock('../../../api/commerce-tools-api-profile');

const mockCustomer = {
  id: 'customer123',
  firstName: 'John',
  lastName: 'Doe',
  addresses: [
    {
      id: 'address123',
      country: 'US',
    },
  ],
};

describe('EditAddress', () => {
  const mockOnClose = vi.fn();

  it('renders the form and its fields', () => {
    render(
      <BrowserRouter>
        <EditAddress onClose={mockOnClose} address={mockCustomer.addresses[0]} />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/First name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select a country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code:/i)).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    render(
      <BrowserRouter>
        <EditAddress onClose={mockOnClose} address={mockCustomer.addresses[0]} />
      </BrowserRouter>,
    );

    fireEvent.submit(screen.getByRole('button', { name: /Confirm/i }));

    expect(await screen.findAllByText(/Required/i)).toHaveLength(3); // Street, City, Postal Code
  });
});
