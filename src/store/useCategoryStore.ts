import { create } from 'zustand';

type CategoryStore = {
  categories: string[];
  addCategories: (data: string[]) => void;
  updateCategories: (data: string[]) => void;
  clearCategories: () => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  addCategories: (data: string[]) => {
    set({ categories: data });
  },
  updateCategories: (data: string[]) => {
    set((state) => ({
      categories: [...state.categories, ...data],
    }));
  },
  clearCategories: () => set({ categories: [] }),
}));
