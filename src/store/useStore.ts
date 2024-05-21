import { create } from 'zustand';
import { ECommerceKey } from '../api/commers-tools-api';

type Store = {
  isLogged: boolean;
  setLogged: (flag: boolean) => void;
};

function isUserInLS(): boolean {
  const data = JSON.parse(localStorage.getItem(ECommerceKey)!);
  return data && data.customerId;
}

const useStore = create<Store>()((set) => ({
  isLogged: isUserInLS(),
  setLogged: (flag) => set({ isLogged: flag }),
}));

export { useStore };
