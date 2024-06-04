import { create } from 'zustand';

type CategoryStore = {
  categories: string[];
  movie: boolean;
  discount: boolean;
  sortingCriteria: string;
  sortingValue: string;
  minPrice: string;
  maxPrice: string;
  minPositiveCalls: string;
  maxPositiveCalls: string;
  searchWords: string;
  closeCatalog: boolean;
  resetMin: string;
  resetMax: string;
  addCategories: (data: string[]) => void;
  updateCategories: (data: string[]) => void;
  clearCategories: () => void;
  isMovie: (data: boolean) => void;
  isDiscounted: (value: boolean) => void;
  setSortingCriteria: (data: string) => void;
  setSortingValue: (data: string) => void;
  setPriceMin: (data: string) => void;
  setPriceMax: (data: string) => void;
  setPositiveCallsMin: (data: string) => void;
  setPositiveCallsMax: (data: string) => void;
  setSearchWords: (data: string) => void;
  setCloseCatalog: (data: boolean) => void;
  setResetMin: (data: string) => void;
  setResetMax: (data: string) => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  movie: false,
  discount: false,
  sortingCriteria: '',
  sortingValue: '',
  minPrice: '0',
  maxPrice: '50000',
  minPositiveCalls: '0',
  maxPositiveCalls: '50000',
  searchWords: '',
  closeCatalog: true,
  resetMin: '0',
  resetMax: '50000',
  addCategories: (data: string[]) => {
    set({ categories: data });
  },
  updateCategories: (data: string[]) => {
    set((state) => ({
      categories: [...state.categories, ...data],
    }));
  },
  clearCategories: () => set({ categories: [] }),
  isMovie: (data: boolean) => {
    set({ movie: data });
  },
  isDiscounted: (value: boolean) => {
    set({ discount: value });
  },
  setSortingCriteria: (data: string) => {
    set({ sortingCriteria: data });
  },
  setSortingValue: (data: string) => {
    set({ sortingValue: data });
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
  setCloseCatalog: (data: boolean) => {
    set({ closeCatalog: data });
  },
  setResetMin: (data: string) => {
    set({ resetMin: data });
  },
  setResetMax: (data: string) => {
    set({ resetMax: data });
  },
}));
