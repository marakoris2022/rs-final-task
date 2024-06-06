import { useCustomerStore } from './useCustomerStore';
import { UserPropsExtended } from '../interfaces/interfaces';

describe('Customer Store', () => {
  beforeEach(() => {
    useCustomerStore.setState({ customer: null });
  });

  it('should set and get customer data', () => {
    const mockCustomer: UserPropsExtended = {
      id: 'customer123',
      firstName: 'John',
      lastName: 'Doe',
      version: 1,
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    useCustomerStore.getState().setCustomer(mockCustomer);

    const storedCustomer = useCustomerStore.getState().customer;

    expect(storedCustomer).toEqual(mockCustomer);
  });

  it('should update customer data', () => {
    const mockCustomer: UserPropsExtended = {
      id: 'customer123',
      firstName: 'John',
      lastName: 'Doe',
      version: 1,
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    useCustomerStore.getState().setCustomer(mockCustomer);

    useCustomerStore.getState().updateCustomer({ firstName: 'Jane' });

    const updatedCustomer = useCustomerStore.getState().customer;

    expect(updatedCustomer?.firstName).toEqual('Jane');
  });

  it('should clear customer data', () => {
    const mockCustomer: UserPropsExtended = {
      id: 'customer123',
      firstName: 'John',
      lastName: 'Doe',
      version: 1,
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    useCustomerStore.getState().setCustomer(mockCustomer);

    useCustomerStore.getState().clearCustomer();

    const storedCustomer = useCustomerStore.getState().customer;

    expect(storedCustomer).toBeNull();
  });
});
