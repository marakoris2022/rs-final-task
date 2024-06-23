import { create } from 'zustand';
import { Cart, RsTeamLS } from '../api/commerce-tools-api-cart';

type CartStore = {
  cart: Cart | null;
  setCart: (data: Cart) => void;
  updateCart: (data: Partial<Cart>) => void;
};

const broadcast = new BroadcastChannel('cart_channel');

export const useCartStore = create<CartStore>()((set) => {
  broadcast.onmessage = (event) => {
    const updatedCart = event.data;
    set({ cart: updatedCart });
  };

  return {
    cart: null,
    setCart: (data: Cart) => {
      set({ cart: data });
      broadcast.postMessage(data);
    },
    updateCart: (data: Partial<Cart>) =>
      set((state) => {
        const updatedCart = state.cart ? { ...state.cart, ...data } : null;

        if (updatedCart) {
          localStorage.setItem(RsTeamLS.CART, JSON.stringify(updatedCart));
          broadcast.postMessage(updatedCart);
        }

        return { cart: updatedCart };
      }),
  };
});
