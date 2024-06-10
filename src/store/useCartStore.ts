import { create } from 'zustand';
import { Cart, RsTeamLS } from '../api/commerce-tools-api-cart';

type CartStore = {
  cart: Cart | null;
  setCart: (data: Cart) => void;
  updateCart: (data: Partial<Cart>) => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  cart: null,
  setCart: (data: Cart) => set({ cart: data }),
  updateCart: (data: Partial<Cart>) =>
    set((state) => {
      const updatedCart = state.cart ? { ...state.cart, ...data } : null;

      if (updatedCart) {
        localStorage.setItem(RsTeamLS.CART, JSON.stringify(updatedCart));
      }

      return { cart: updatedCart };
    }),
}));
