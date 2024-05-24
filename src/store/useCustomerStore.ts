import { create } from 'zustand';
import { UserProps } from '../interfaces/interfaces';

type CustomerStore = {
  customer: UserProps | null;
  setCustomer: (data: UserProps) => void;
  updateCustomer: (data: Partial<UserProps>) => void;
  clearCustomer: () => void;
};

export const useCustomerStore = create<CustomerStore>()((set) => ({
  customer: null,
  setCustomer: (data: UserProps) => set({ customer: data }),
  updateCustomer: (data: Partial<UserProps>) =>
    set((state) => ({
      customer: state.customer ? { ...state.customer, ...data } : null,
    })),
  clearCustomer: () => set({ customer: null }),
}));
