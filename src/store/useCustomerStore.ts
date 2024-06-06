import { create } from 'zustand';
import { UserProps, UserPropsExtended } from '../interfaces/interfaces';

type CustomerStore = {
  customer: UserPropsExtended | null;
  setCustomer: (data: UserPropsExtended) => void;
  updateCustomer: (data: Partial<UserProps>) => void;
  clearCustomer: () => void;
};

export const useCustomerStore = create<CustomerStore>()((set) => ({
  customer: null,
  setCustomer: (data: UserPropsExtended) => set({ customer: data }),
  updateCustomer: (data: Partial<UserProps>) =>
    set((state) => ({
      customer: state.customer ? { ...state.customer, ...data } : null,
    })),
  clearCustomer: () => set({ customer: null }),
}));
