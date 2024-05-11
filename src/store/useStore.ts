import { create } from 'zustand';

type Store = {
  isLogged: boolean;
  setLogged: (flag: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  isLogged: localStorage.getItem('commerce-tools-rsteam-games-store') ? true : false,
  setLogged: (flag) => set({ isLogged: flag }),
}));

export { useStore };
