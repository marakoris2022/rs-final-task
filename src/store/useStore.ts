import { create } from 'zustand';

const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

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
