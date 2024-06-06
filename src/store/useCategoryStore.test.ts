import { useCategoryStore } from './useCategoryStore';

describe('Category Store', () => {
  beforeEach(() => {
    useCategoryStore.setState({
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
      resetMinCalls: '0',
      resetMaxCalls: '5000',
    });
  });

  it('should add categories', () => {
    const categories = ['Action', 'Adventure', 'Comedy'];

    useCategoryStore.getState().addCategories(categories);

    const storedCategories = useCategoryStore.getState().categories;

    expect(storedCategories).toEqual(categories);
  });

  it('should update categories', () => {
    useCategoryStore.getState().addCategories(['Action', 'Adventure']);

    const additionalCategories = ['Comedy', 'Drama'];

    useCategoryStore.getState().updateCategories(additionalCategories);

    const updatedCategories = useCategoryStore.getState().categories;

    expect(updatedCategories).toEqual(['Action', 'Adventure', 'Comedy', 'Drama']);
  });
});
