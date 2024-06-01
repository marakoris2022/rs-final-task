import { ECommerceLS } from '../interfaces/interfaces';
import { apiClient } from './commers-tools-api';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

type CategoryConfig = {
  data?: URLSearchParams;
  headers: {
    Authorization: string;
  };
};

export type CategoryResults = {
  description: {
    ['en-US']: string;
  };
  id: string;
  key: string;
  name: {
    ['en-US']: string;
  };
  slug: {
    ['en-US']: string;
  };
  version: number;
};

type CategoryObj = {
  count: number;
  limit: number;
  offset: number;
  results: CategoryResults[];
  total: number;
};

type Dimension = {
  w: number;
  h: number;
};

type Image = {
  dimensions: Dimension;
  label: string;
  url: string;
};

type Price = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

type Attribute = {
  name: string;
  value: string | number;
};

type Category = {
  typeId: string;
  id: string;
};

type MasterVariant = {
  attributes: Attribute[];
  images: Image[];
  prices: {
    discounted?: {
      value: Price;
    };
    id: string;
    value: Price;
  }[];
};

type MasterData = {
  current: {
    categories: Category[];
    description: Record<string, string>;
    masterVariant: MasterVariant;
    name: Record<string, string>;
  };
};

export type ProductTypeByKey = {
  masterData: MasterData;
  id: number;
  key: string;
};

export type ProductType = {
  id: string;
  key: string;
  description: {
    ['en-US']: string;
  };
  masterVariant: MasterVariant;
  name: {
    en: string;
    ['en-US']: string;
  };
  productType: { typeId: string; id: string };
  version: number;
};

export async function getCategories(sort: string = '', limit: number = 0): Promise<CategoryResults[] | null> {
  let selectedCategories = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (sort || limit) {
      const data = new URLSearchParams();
      data.append('sort', `${sort}`);
      data.append('limit', `${limit}`);
      config['data'] = data;
    }

    const response = await apiClient.get(`/${projectKey}/categories`, config);
    const { results } = response.data as CategoryObj;
    selectedCategories = results;
  }
  return selectedCategories;
}

export async function getProductsByCategory(
  categoryID: string[] = ['93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b', 'ded52f2e-0d4d-4015-bbde-70c0142c61f0'],
  limit: number = 30,
): Promise<ProductType[] | null> {
  let selectedProducts = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const arr: string[] = categoryID;
    const categoryIDJoined =
      arr.length === 0 ? '93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b' : arr.length === 1 ? arr[0] : arr.join('","');
    const response = await apiClient.get(
      `/${projectKey}/product-projections/search?filter=categories.id:"${categoryIDJoined}"&limit=${limit}`,
      config,
    );
    const { results } = response.data;
    selectedProducts = results;
  }
  return selectedProducts;
}

/* GET /{projectKey}/product-projections/search?staged=true&limit=10&text.en="simpsons" */
export async function getProductsByText(searchWords: string, limit: number = 30): Promise<ProductType[] | null> {
  let selectedProducts = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.get(
      `/${projectKey}/product-projections/search?text.en="${searchWords}"&limit=${limit}`,
      config,
    );
    const { results } = response.data;
    selectedProducts = results;
    console.log(selectedProducts);
  }
  return selectedProducts;
}

export async function getProductProjection(
  categoryID: string[] = [],
  releaseYears: string[] = [],
  discount: boolean = false,
  sortingCriteria: string = '',
  sortingValue: string = '',
  minPrice: string = '0',
  maxPrice: string = '50000',
  minPositiveCalls: string = '0',
  maxPositiveCalls: string = '500',
  searchWords: string = '',
  limit: number = 30,
): Promise<ProductType[] | null> {
  let selectedProducts = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let urlString = `/${projectKey}/product-projections/search?`
    const query: string[] = [];
    const priceRange = `${Math.min(+minPrice, +maxPrice)} to ${Math.max(+minPrice, +maxPrice)}`;
    if (categoryID.length > 0) {
      const arr: string[] = categoryID;
      const categoryIDJoined = arr.length === 1 ? arr[0] : arr.join('","');
      query.push(`filter=categories.id:"${categoryIDJoined}"`);
    }
    if (searchWords) {
      query.push(`fuzzy=true&fuzzyLevel=1&text.en-us="${searchWords}"`);
    }
    if (categoryID.length === 0 && !searchWords) {
      const categoryIDJoined = '93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b';
      query.push(`filter=categories.id:"${categoryIDJoined}"`);
    }
    query.push(`&filter=variants.price.centAmount:range(${priceRange})`);
    if (discount) query.push(`&filter=variants.scopedPriceDiscounted:true&priceCurrency=USD`);
    query.push(`&limit=${limit}`);
    if (sortingCriteria && sortingValue) query.push(`&sort=${sortingCriteria} ${sortingValue}`);

    urlString += query.join('&');
    console.log(urlString);
    const response = await apiClient.get(urlString, config);
    const { results } = response.data;
    if (results.length === 0) throw new Error('There is no product matching your query');
    selectedProducts = results;
  }
  return selectedProducts;
}

export async function getProductByKey(key: string): Promise<ProductTypeByKey | null> {
  let selectedProduct = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.get(`/${projectKey}/products/key=${key}`, config);
    selectedProduct = response.data;
  }
  return selectedProduct;
}
