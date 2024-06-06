import { initializeCart } from '../api/commerce-tools-api-cart';
import { getBasicToken, getCustomerById } from '../api/commers-tools-api';
import { ECommerceLS } from '../interfaces/interfaces';
import { useStore } from '../store/useStore';

const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

export async function initializeUserSession(isLogged: boolean) {
  let commerceInfo = localStorage.getItem(ECommerceKey) as string | null;

  if (!isLogged && !commerceInfo) {
    commerceInfo = await getBasicToken();
  }

  if (isLogged && commerceInfo) {
    const { accessToken, customerId } = JSON.parse(commerceInfo) as ECommerceLS;
    customerId && (await getCustomerById(customerId, accessToken));
  }

  const setIsToken = useStore.getState().setIsToken;
  setIsToken(true);

  await initializeCart();
}
