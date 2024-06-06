import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AddAddress } from './AddAddress';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../button/Button', () => {
  return {
    Button: ({
      title,
      onClick,
      type = 'button',
      disabled,
    }: {
      title: string;
      onClick: () => void;
      type?: 'button' | 'submit' | 'reset';
      disabled?: boolean;
    }) => (
      <button type={type} onClick={onClick} disabled={disabled}>
        {title}
      </button>
    ),
  };
});

vi.mock('../../../store/useCustomerStore', () => ({
  useCustomerStore: vi.fn().mockReturnValue({
    customer: { firstName: 'John', lastName: 'Doe' },
    setCustomer: vi.fn(),
  }),
}));

vi.mock('../../../api/commerce-tools-api-profile', () => ({
  addNewAddress: vi.fn().mockResolvedValue({}),
  setDefaultAddressType: vi.fn().mockResolvedValue({}),
  AddressTypes: {
    SHIPPING: 'Shipping',
    BILLING: 'Billing',
  },
  DefaultAddressTypes: {
    SHIPPING: 'defaultShippingAddress',
    BILLING: 'defaultBillingAddress',
  },
}));

describe('AddAddress component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <AddAddress />
      </BrowserRouter>,
    );
    expect(screen.getByText('Add new address')).toBeInTheDocument();
  });

  it('calls navigate on back button click', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <AddAddress />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith('/profile/addresses');
  });
});
