import { create } from 'zustand';
import { ECommerceKey } from '../api/commers-tools-api';

type Store = {
  isLogged: boolean;
  setLogged: (flag: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  isLogged: localStorage.getItem(ECommerceKey) ? true : false,
  setLogged: (flag) => set({ isLogged: flag }),
}));

export { useStore };
