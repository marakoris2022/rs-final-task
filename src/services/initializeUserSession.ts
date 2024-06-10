import {
  RsTeamLS,
  createCart,
  getCartByCustomerId,
  initializeCart,
  setCartToCustomerById,
} from '../api/commerce-tools-api-cart';
import { getBasicToken, getCustomerById } from '../api/commers-tools-api';
import { ECommerceLS } from '../interfaces/interfaces';
import { useCartStore } from '../store/useCartStore';
import { useStore } from '../store/useStore';

const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

export async function initializeUserSession(isLogged: boolean) {
  let commerceInfo = localStorage.getItem(ECommerceKey) as string | null;

  if (!isLogged && !commerceInfo) {
    commerceInfo = await getBasicToken();
  }

  await initializeCart();

  if (isLogged && commerceInfo) {
    const { accessToken, customerId } = JSON.parse(commerceInfo) as ECommerceLS;
    customerId && (await getCustomerById(customerId, accessToken));

    const customerCart = await getCartByCustomerId(customerId!);

    if (!customerCart) {
      const newCart = await createCart();
      await setCartToCustomerById(newCart!, customerId!);
    } else {
      localStorage.setItem(RsTeamLS.CART, JSON.stringify(customerCart));
      const setCart = useCartStore.getState().setCart;
      setCart(customerCart);
    }
  }

  const setIsToken = useStore.getState().setIsToken;
  setIsToken(true);
}
