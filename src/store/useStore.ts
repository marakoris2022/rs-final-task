import { create } from 'zustand';

type Store = {
  isLogged: boolean;
  setLogged: (flag: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  isLogged: false,
  setLogged: (flag) => set({ isLogged: flag }),
}));

export { useStore };
