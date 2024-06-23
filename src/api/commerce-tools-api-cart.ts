import axios from 'axios';
import { Address, ECommerceLS } from '../interfaces/interfaces';
import { useCartStore } from '../store/useCartStore';
import { apiClient } from './commers-tools-api';
import { ProductType } from './catalogue-api';
import { ProductData } from '../pages/product/Product';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

enum CartActions {
  ADD_LINE_ITEM = 'addLineItem',
  SET_LINE_ITEM_QUANTITY = 'changeLineItemQuantity',
  SET_CART_TO_CUSTOMER = 'setCustomerId',
  ADD_DISCOUNT_CODE = 'addDiscountCode',
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

enum ResponseStatus {
  NOT_FOUND = 404,
}

interface TotalCartPrice {
  centAmount: number;
  currencyCode: 'USD';
  fractionDigits: number;
  type: 'centPrecision';
}

interface discountCodes {
  discountCode: {
    id: string;
  };
}

export interface ProductDataLineItem {
  id: string;
  name: {
    en: string;
    'en-US': string;
  };
  price: {
    value: {
      centAmount: number;
    };
    discounted?: {
      value: {
        centAmount: number;
      };
    };
  };
  totalPrice: {
    centAmount: number;
  };
  variant: {
    images: {
      url: string;
    }[];
  };
  productId: string;
  productKey: string;
  quantity: number;
  version: number;
  discountedPrice?: {
    value: {
      centAmount: number;
    };
  };
  taxCategory?: string;
}
export interface Cart {
  cartState: CartState;
  createdAt: Date;
  deleteDaysAfterLastModification: number;
  id: string;
  inventoryMode: InventoryMode;
  itemShippingAddresses: Address[];
  lastMessageSequenceNumber: number;
  lastModifiedAt: Date;
  lineItems: ProductDataLineItem[];
  totalPrice: TotalCartPrice;
  type: 'Cart';
  version: number;
  customerId?: string;
  discountCodes?: discountCodes[] | undefined;
}

const manageCart = async (commerceObj: string, cart: Cart) => {
  const lastModifiedAt = new Date(cart.lastModifiedAt).getTime();
  const dateNow = new Date().getTime();

  const sixtyDays = daysToMilliseconds(60);

  if (dateNow - lastModifiedAt > sixtyDays) {
    let newCartResp = await createCart();

    if (cart.customerId) {
      const customerId = (JSON.parse(commerceObj) as ECommerceLS).customerId;
      newCartResp = await setCartToCustomerById(newCartResp!, customerId!);
    }

    if (cart.lineItems && cart.lineItems.length > 0) {
      for (const item of cart.lineItems) {
        await addProductToCart(newCartResp!, item as ProductDataLineItem, item.quantity, true);
      }
    } else {
      const updateCart = useCartStore.getState().updateCart;
      updateCart(newCartResp!);
    }
  } else {
    const setCart = useCartStore.getState().setCart;
    setCart(cart);
  }
};

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

      if (JSON.parse(commerceObj).customerId) {
        const cartByCustomer = await getCartByCustomerId(JSON.parse(commerceObj).customerId);

        if (cartByCustomer) {
          await manageCart(commerceObj, cartByCustomer);
        } else {
          await manageCart(commerceObj, cart);
        }
      } else {
        if (cart?.customerId) {
          await createCart();
        } else {
          await manageCart(commerceObj, cart);
        }
      }
    } else {
      if (JSON.parse(commerceObj).customerId) {
        const cartByCustomer = await getCartByCustomerId(JSON.parse(commerceObj).customerId);

        if (cartByCustomer) {
          localStorage.setItem(RsTeamLS.CART, JSON.stringify(cartByCustomer));
          const setCart = useCartStore.getState().setCart;
          setCart(cartByCustomer as unknown as Cart);
        } else {
          const newCart = await createCart();
          await setCartToCustomerById(newCart!, JSON.parse(commerceObj).customerId);
        }
      } else {
        await createCart();
      }
    }
  }
};

export const getCartByCustomerId = async (customerId: string): Promise<Cart | null | undefined> => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await apiClient.get(
        `/${projectKey}/carts?customerId=${customerId}&sort=createdAt desc&limit=1`,
        config,
      );

      if (response.data?.cartState === CartState.ACTIVE || response.data?.cartState === CartState.FROZEN) {
        const updateCart = useCartStore.getState().updateCart;
        updateCart(response.data);

        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === ResponseStatus.NOT_FOUND) {
        return null;
      } else {
        throw error;
      }
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

    const requestBody = {
      version: cart.version,
      actions: [
        {
          action: CartActions.SET_CART_TO_CUSTOMER,
          customerId: customerId,
        },
      ],
    };

    const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, requestBody, config);

    const updateCart = useCartStore.getState().updateCart;
    updateCart(data);

    return data;
  }
};

export const addProductToCart = async (
  cart: Cart,
  product: ProductDataLineItem | ProductData | ProductType,
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

    const updateBody = {
      version: cart.version,
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

export const changeProductsQuantity = async (
  cart: Cart,
  products: ProductDataLineItem[] | ProductData[] | ProductType[],
  quantityToAdd: number,
) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const actions = products.map((product) => {
      const itemToUpdate = cart.lineItems.find((item) => item.productId === product.id);
      const lineItemId = itemToUpdate ? itemToUpdate.id : product.id;

      return {
        action: CartActions.SET_LINE_ITEM_QUANTITY,
        lineItemId: lineItemId,
        quantity: quantityToAdd,
      };
    });

    const requestBody = {
      version: cart.version,
      actions: actions,
    };

    const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, requestBody, config);

    const updateCart = useCartStore.getState().updateCart;
    updateCart(data);

    return data;
  }
};

export const addDiscountCode = async (cart: Cart, discountCode: string) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const requestBody = {
        version: cart.version,
        actions: [
          {
            action: CartActions.ADD_DISCOUNT_CODE,
            code: discountCode,
          },
        ],
      };

      const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, requestBody, config);

      const updateCart = useCartStore.getState().updateCart;
      updateCart(data);

      return data as Cart;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      } else if (error instanceof Error) {
        throw error;
      }
    }
  }
};

export const removeDiscountCode = async (cart: Cart, discountCode: string) => {
  const commerceObj = localStorage.getItem(ECommerceKey);

  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const requestBody = {
        version: cart.version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: discountCode,
            },
          },
        ],
      };

      const { data } = await apiClient.post(`/${projectKey}/carts/${cart.id}`, requestBody, config);

      const updateCart = useCartStore.getState().updateCart;
      updateCart(data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      } else if (error instanceof Error) {
        throw error;
      }
    }
  }
};
