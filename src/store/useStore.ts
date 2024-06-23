import { create } from 'zustand';

const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

const authBroadcast = new BroadcastChannel('auth_channel');
type Store = {
  isLogged: boolean;
  setLogged: (flag: boolean) => void;
  isToken: boolean;
  setIsToken: (flag: boolean) => void;
};

function isUserInLS(): boolean {
  const data = JSON.parse(localStorage.getItem(ECommerceKey)!);
  return !!data?.customerId;
}

const useStore = create<Store>()((set) => {
  authBroadcast.onmessage = (event) => {
    const { isLogged, isToken } = event.data;
    set({ isLogged, isToken });
  };

  return {
    isLogged: isUserInLS(),
    setLogged: (flag) => {
      set({ isLogged: flag });
      authBroadcast.postMessage({ isLogged: flag, isToken: useStore.getState().isToken });
    },
    isToken: false,
    setIsToken: (flag) => {
      set({ isToken: flag });
      authBroadcast.postMessage({ isLogged: useStore.getState().isLogged, isToken: flag });
    },
  };
});

export { useStore };
