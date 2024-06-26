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
  searchWordsForFetching: string;
  closeCatalog: boolean;
  resetMin: string;
  resetMax: string;
  resetMinCalls: string;
  resetMaxCalls: string;
  limit: number;
  offset: number;
  sortingOption: string;
  movieOption: string;
  discountOption: string;
  categoryCheckedItems: string[];
  sliderPriceValues: number[];
  sliderCBValues: number[];
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
  setResetMinCalls: (data: string) => void;
  setResetMaxCalls: (data: string) => void;
  setLimit: (data: number) => void;
  setOffset: (data: number) => void;
  setSortingOption: (data: string) => void;
  setDiscountOption: (data: string) => void;
  setMovieOption: (data: string) => void;
  setCategoryCheckedItems: (data: string) => void;
  removeCategoryCheckedItems: (data: string) => void;
  clearCategoryCheckedItems: () => void;
  resetFilters: () => void;
  setSliderPriceValues: (data: number[]) => void;
  setSliderCBValues: (data: number[]) => void;
  setSearchWordsForFetching: (data: string) => void;
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
  maxPositiveCalls: '5000',
  searchWords: '',
  searchWordsForFetching: '',
  closeCatalog: true,
  resetMin: '0',
  resetMax: '50000',
  resetMinCalls: '0',
  resetMaxCalls: '5000',
  limit: 10,
  offset: 0,
  sortingOption: 'priceAsc',
  movieOption: 'moviesIncluded',
  discountOption: 'allProducts',
  categoryCheckedItems: ['93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b'],
  sliderPriceValues: [0, 50000],
  sliderCBValues: [0, 5000],
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
  setSearchWordsForFetching: (data: string) => {
    set({ searchWordsForFetching: data });
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
  setResetMinCalls: (data: string) => {
    set({ resetMinCalls: data });
  },
  setResetMaxCalls: (data: string) => {
    set({ resetMaxCalls: data });
  },
  setLimit: (data: number) => {
    set({ limit: data });
  },
  setOffset: (data: number) => {
    set({ offset: data });
  },
  setSortingOption: (data: string) => {
    set({ sortingOption: data });
  },
  setMovieOption: (data: string) => {
    set({ movieOption: data });
  },
  setDiscountOption: (data: string) => {
    set({ discountOption: data });
  },
  setSliderPriceValues: (data: number[]) => {
    set({ sliderPriceValues: data });
  },
  setSliderCBValues: (data: number[]) => {
    set({ sliderCBValues: data });
  },
  setCategoryCheckedItems: (data: string) => {
    set((state) => ({ categoryCheckedItems: state.categoryCheckedItems.concat(data) }));
  },
  removeCategoryCheckedItems: (data: string) => {
    set((state) => ({
      categoryCheckedItems: state.categoryCheckedItems.filter((item) => item !== data),
    }));
  },
  clearCategoryCheckedItems: () => set({ categoryCheckedItems: [] }),

  resetFilters: () => {
    set(() => ({
      sortingOption: 'priceAsc',
      movieOption: 'moviesIncluded',
      discountOption: 'allProducts',
      categoryCheckedItems: ['93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b'],
      searchWords: '',
      resetMin: '0',
      resetMax: '50000',
      resetMinCalls: '0',
      resetMaxCalls: '5000',
    }));
  },
}));
