import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { CheckboxComponent } from '../../../components/checkbox/CheckboxComponent';
import { CategoryResults } from '../../../api/catalogue-api';
import { useCategoryStore } from '../../../store/useCategoryStore';
import { DoubleSlider } from '../../../components/slider/DoubleSlider';
import { DoubleSliderCallbacks } from '../../../components/slider/DoubleSliderCallbacks';
import { SortOptions } from './sort-section/SortOptions';
import { SearchWords } from '../../../components/search-field/SearchWords';

type CategoryListType = {
  categoryList: CategoryResults[];
  setCurrentPage: (data: number) => void;
};

const arraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value == arr2[index]);
};

export const CategoryList = ({ categoryList, setCurrentPage }: CategoryListType) => {
  const addCategories = useCategoryStore((state) => state.addCategories);
  const clearCategories = useCategoryStore((state) => state.clearCategories);
  const clearCategoryCheckedItems = useCategoryStore((state) => state.clearCategoryCheckedItems);
  const categories = useCategoryStore((state) => state.categories);
  const isMovie = useCategoryStore((state) => state.isMovie);
  const isDiscounted = useCategoryStore((state) => state.isDiscounted);
  const setSortingCriteria = useCategoryStore((state) => state.setSortingCriteria);
  const setSortingValue = useCategoryStore((state) => state.setSortingValue);
  const setPriceMin = useCategoryStore((state) => state.setPriceMin);
  const setPriceMax = useCategoryStore((state) => state.setPriceMax);
  const setPositiveCallsMin = useCategoryStore((state) => state.setPositiveCallsMin);
  const setPositiveCallsMax = useCategoryStore((state) => state.setPositiveCallsMax);
  const setSearchWords = useCategoryStore((state) => state.setSearchWords);
  const setSearchWordsForFetching = useCategoryStore((state) => state.setSearchWordsForFetching);
  const setCloseCatalog = useCategoryStore((state) => state.setCloseCatalog);
  const categoryCheckedItems = useCategoryStore((state) => state.categoryCheckedItems);
  const resetFilters = useCategoryStore((state) => state.resetFilters);
  const setOffset = useCategoryStore((state) => state.setOffset);

  const resetHandler = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const form = event.target;

      const searchedWordsInput = form.elements.namedItem('searchField') as HTMLInputElement;
      if (searchedWordsInput && searchedWordsInput.value) {
        if (searchedWordsInput.value.length < 3) return;
        setSearchWords(searchedWordsInput.value);
        setSearchWordsForFetching(searchedWordsInput.value);
      } else {
        setSearchWords('');
        setSearchWordsForFetching('');
      }

      const categorySet = form.elements.namedItem('categoryFieldSet') as HTMLFieldSetElement | null;
      if (categorySet) {
        const formElements = Array.from(categorySet.elements) as HTMLInputElement[];
        const filtered = formElements.filter((elem) => elem.type === 'checkbox' && elem.checked);
        const mapped = filtered.map((box) => box.value);
        if (!arraysEqual(categories, mapped)) {
          addCategories(mapped);
        }
      }

      const priceSet = form.elements.namedItem('priceFieldSet') as HTMLFieldSetElement | null;
      if (priceSet) {
        const priceRangeMin = priceSet.elements.namedItem('minValue') as HTMLInputElement | null;
        const priceRangeMax = priceSet.elements.namedItem('maxValue') as HTMLInputElement | null;
        priceRangeMin && setPriceMin(priceRangeMin.value);
        priceRangeMax && setPriceMax(priceRangeMax.value);
      }
      const positiveCallsSet = form.elements.namedItem('positiveCallsFieldSet') as HTMLFieldSetElement | null;
      if (positiveCallsSet) {
        const callsRangMin = positiveCallsSet.elements.namedItem('minValue') as HTMLInputElement | null;
        const callsRangeMax = positiveCallsSet.elements.namedItem('maxValue') as HTMLInputElement | null;
        callsRangMin && setPositiveCallsMin(callsRangMin.value);
        callsRangeMax && setPositiveCallsMax(callsRangeMax.value);
      }
      const movieSet = form.elements.namedItem('movieFieldSet') as HTMLFieldSetElement | null;
      if (movieSet) {
        const options = movieSet.getElementsByClassName('movieSet') as HTMLCollectionOf<HTMLInputElement> | null;
        const found = options ? Array.from(options).find((item) => item.checked) : null;
        isMovie(Boolean(found && found.value === 'true'));
      }
      const discountSet = form.elements.namedItem('discountFieldSet') as HTMLFieldSetElement | null;
      if (discountSet) {
        const options = discountSet.getElementsByClassName('discountSet') as HTMLCollectionOf<HTMLInputElement> | null;
        const found = options ? Array.from(options).find((item) => item.checked) : null;
        isDiscounted(Boolean(found && found.value === 'true'));
      }
      const sortingSet = form.elements.namedItem('sortingFieldSet') as HTMLFieldSetElement | null;
      if (sortingSet) {
        const options = sortingSet.getElementsByClassName('sorting') as HTMLCollectionOf<HTMLInputElement> | null;
        const found = options ? Array.from(options).find((item) => item.checked) : null;
        found && setSortingValue(found.value);
        found && found.dataset.name && setSortingCriteria(found.dataset.name);
      }
      setOffset(0);
      setCurrentPage(1);
      setCloseCatalog(true);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.btnsContainer}>
        <input type="submit" className={styles.formBtn} value="submit" />
        <button type="button" className={styles.formBtn} onClick={resetHandler}>
          reset
        </button>
      </div>
      <div className={styles.titleContainer}>{<h2 className={styles.categoryTitle}>Categories</h2>}</div>
      <SearchWords setPage={setCurrentPage} />
      <fieldset className={styles.categoryWrapper} name="categoryFieldSet">
        {categoryList.map((category) => (
          <CheckboxComponent
            name={category.name['en-US']}
            key={category.id}
            value={category.id}
            isChecked={Array.from(categoryCheckedItems).includes(category.id)}
          >
            {category.name['en-US']}
            <a
              onClick={() => {
                clearCategories();
                addCategories([category.id]);
                clearCategoryCheckedItems();
                setOffset(0);
                setCurrentPage(1);
              }}
              style={{ color: 'white' }}
            >
              <span className={styles.categoryLinkBtn}></span>
            </a>
          </CheckboxComponent>
        ))}
      </fieldset>
      <fieldset className={styles.priceFilterWrapper} name="priceFieldSet">
        <DoubleSlider title={'Price'} MIN={0} MAX={50000} signs={'C'}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.positiveCallbacksFilterWrapper} name="positiveCallsFieldSet">
        <DoubleSliderCallbacks title={'Positive Callbacks'} MIN={0} MAX={5000}></DoubleSliderCallbacks>
      </fieldset>
      <SortOptions></SortOptions>
    </form>
  );
};
