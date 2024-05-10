import { createContext, useContext } from 'react';

interface IsLoggedContextType {
  isLoggedUser: boolean;
  setIsLoggedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const isLoggedContext = createContext<IsLoggedContextType | undefined>(undefined);

export function useIsLoggedContext() {
  const isLogged = useContext(isLoggedContext);

  if (isLogged === undefined) {
    throw new Error('useIsLoggedContext must be used in App');
  }

  return isLogged;
}
