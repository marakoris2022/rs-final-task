import { createContext, useContext, ReactNode } from 'react';

interface Store {
  isLogged: boolean;
  setLogged: (value: boolean) => void;
}

const defaultStore: Store = {
  isLogged: false,
  setLogged: () => { },
};

const StoreContext = createContext<Store>(defaultStore);

interface StoreProviderProps {
  children: ReactNode;
  value: Store;
}

export const StoreProvider = ({ children, value }: StoreProviderProps) => (
  <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
