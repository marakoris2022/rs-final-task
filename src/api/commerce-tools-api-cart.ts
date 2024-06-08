import { Address, ECommerceLS } from '../interfaces/interfaces';
import { ProductData } from '../pages/product/Product';
import { useCartStore } from '../store/useCartStore';
import { apiClient } from './commers-tools-api';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

enum CartActions {
  ADD_LINE_ITEM = 'addLineItem',
  SET_LINE_ITEM_QUANTITY = 'changeLineItemQuantity',
  SET_CART_TO_CUSTOMER = 'setCustomerId',
}

enum CartState {
  ACTIVE = 'Active',
  MERGED = 'Merged',
  ORDERED = 'Ordered',
  FROZEN = 'Frozen',
}

enum InventoryMode {
  NONE = 'None',
  TRACK_ONLY = 'TrackOnly',
  REVERSE_ON_ORDER = 'ReserveOnOrder',
}

export enum RsTeamLS {
  CART = 'rs-team-cart',
}

interface TotalCartPrice {
  centAmount: number;
  currencyCode: 'USD';
  fractionDigits: number;
  type: 'centPrecision';
}

export interface Cart {
  cartState: CartState;
  createdAt: Date;
  deleteDaysAfterLastModification: number;
  directDiscounts: number[] | undefined;
  discountCodes: number[] | undefined;
  id: string;
  inventoryMode: InventoryMode;
  itemShippingAddresses: Address[];
  lastMessageSequenceNumber: number;
  lastModifiedAt: Date;
  lineItems: ProductData[];
  shipping: number[] | undefined;
  totalPrice: TotalCartPrice;
  type: 'Cart';
  version: number;
  customerId?: string;
}

export const createCart = async () => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      currency: 'USD',
    };

    const { data } = await apiClient.post(`/${projectKey}/carts`, body, config);

    localStorage.setItem(RsTeamLS.CART, JSON.stringify(data));

    const setCart = useCartStore.getState().setCart;
    setCart(data);

    return data as Cart;
  }
};

export const initializeCart = async () => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const cartFromLS = localStorage.getItem(RsTeamLS.CART);

    if (cartFromLS) {
      const cart = JSON.parse(cartFromLS) as Cart;

      const lastModifiedAt = new Date(cart.lastModifiedAt).getTime();
      const dateNow = new Date().getTime();

      const sevenDays = daysToMilliseconds(7);

      if (dateNow - lastModifiedAt > sevenDays) {
        let newCartResp = await createCart();

        if (cart.customerId) {
          const customerId = (JSON.parse(commerceObj) as ECommerceLS).customerId;
          newCartResp = await setCartToCustomerById(newCartResp!, customerId!);
        }

        if (cart.lineItems && cart.lineItems.length > 0) {
          for (const item of cart.lineItems) {
            await addProductToCart(newCartResp!, item, item.quantity, true);
          }
        } else {
          const updateCart = useCartStore.getState().updateCart;
          updateCart(newCartResp!);
        }
      } else {
        const setCart = useCartStore.getState().setCart;
        setCart(cart);
      }
    } else {
      await createCart();
    }
  }
};

const getCartById = async (cartId: string) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const cartResp = await apiClient.get(`/${projectKey}/carts/${cartId}`, config);

    return cartResp.data as Cart;
  }
};

export const getCartByCustomerId = async (customerId: string) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.get(
      `/${projectKey}/carts?customerId=${customerId}&sort=createdAt desc&limit=1`,
      config,
    );

    if (response.data?.cartState !== CartState.ACTIVE || response.data?.cartState !== CartState.FROZEN) {
      const updateCart = useCartStore.getState().updateCart;
      updateCart(response.data);

      return response.data;
    } else {
      return null;
    }
  }
};

export const setCartToCustomerById = async (cart: Cart, customerId: string) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const actualCart = await getCartById(cart.id);

    const requestBody = {
      version: actualCart!.version,
      actions: [
        {
          action: CartActions.SET_CART_TO_CUSTOMER,
          customerId: customerId,
        },
      ],
    };

    const { data } = await apiClient.post(`/${projectKey}/carts/${actualCart!.id}`, requestBody, config);

    const updateCart = useCartStore.getState().updateCart;
    updateCart(data);

    return data;
  }
};

export const addProductToCart = async (
  cart: Cart,
  product: ProductData,
  quantity: number | undefined,
  copyCart = false,
) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!product.taxCategory && !copyCart) {
      const updateBodyTax = {
        version: product.version,
        actions: [
          {
            action: 'setTaxCategory',
            taxCategory: {
              typeId: 'tax-category',
              id: '4ca66a5b-3138-4acd-9f90-cd900aad44b2',
            },
          },
        ],
      };
      await apiClient.post(`/${projectKey}/products/${product.id}`, updateBodyTax, config);
    }

    const actualCart = await getCartById(cart.id);

    const updateBody = {
      version: actualCart!.version,
      actions: [
        {
          action: CartActions.ADD_LINE_ITEM,
          productId: !copyCart ? product.id : product.productId,
          quantity: quantity || 1,
        },
      ],
    };

    const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, updateBody, config);

    const updateCart = useCartStore.getState().updateCart;
    updateCart(data);

    return data as Cart;
  }
};

export const changeProductQuantity = async (cart: Cart, product: ProductData, quantityToAdd: number) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const actualCart = await getCartById(cart.id);

    const itemToUpdate = actualCart!.lineItems.find((item) => item.productId === product.id);

    const lineItemId = itemToUpdate ? itemToUpdate.id : product.id;

    const requestBody = {
      version: actualCart!.version,
      actions: [
        {
          action: CartActions.SET_LINE_ITEM_QUANTITY,
          lineItemId: lineItemId,
          quantity: quantityToAdd,
        },
      ],
    };

    const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, requestBody, config);

    const updateCart = useCartStore.getState().updateCart;
    updateCart(data);

    return data;
  }
};
