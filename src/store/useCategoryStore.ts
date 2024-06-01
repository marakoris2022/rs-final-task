import { create } from 'zustand';

type CategoryStore = {
  categories: string[];
  releaseYears: string[];
  discount: boolean;
  priceSorting: string;
  nameSorting: string;
  minPrice: string;
  maxPrice: string;
  minPositiveCalls: string;
  maxPositiveCalls: string;
  searchWords: string;
  addCategories: (data: string[]) => void;
  updateCategories: (data: string[]) => void;
  clearCategories: () => void;
  addYears: (data: string[]) => void;
  isDiscounted: (value: boolean) => void;
  setPriceSorting: (data: string) => void;
  setNameSorting: (data: string) => void;
  setPriceMin: (data: string) => void;
  setPriceMax: (data: string) => void;
  setPositiveCallsMin: (data: string) => void;
  setPositiveCallsMax: (data: string) => void;
  setSearchWords: (data: string) => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  releaseYears: [],
  discount: false,
  priceSorting: '',
  nameSorting: '',
  minPrice: '0',
  maxPrice: '50',
  minPositiveCalls: '0',
  maxPositiveCalls: '500',
  searchWords: '',
  addCategories: (data: string[]) => {
    set({ categories: data });
  },
  updateCategories: (data: string[]) => {
    set((state) => ({
      categories: [...state.categories, ...data],
    }));
  },
  clearCategories: () => set({ categories: [] }),
  addYears: (data: string[]) => {
    set({ releaseYears: data });
  },
  isDiscounted: (value: boolean) => {
    set({ discount: value });
  },
  setPriceSorting: (data: string) => {
    set({ priceSorting: data });
  },
  setNameSorting: (data: string) => {
    set({ nameSorting: data });
  },
  setPriceMin: (data: string) => {
    set({ minPrice: data });
  },
  setPriceMax: (data: string) => {
    set({ maxPrice: data });
  },
  setPositiveCallsMin: (data: string) => {
    set({ minPositiveCalls: data });
  },
  setPositiveCallsMax: (data: string) => {
    set({ maxPositiveCalls: data });
  },
  setSearchWords: (data: string) => {
    set({ searchWords: data });
  },
}));