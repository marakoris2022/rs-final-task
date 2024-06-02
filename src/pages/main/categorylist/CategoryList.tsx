import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { CheckboxComponent } from '../../../components/checkbox/CheckboxComponent';
import { CategoryResults } from '../../../api/catalogue-api';
import { useCategoryStore } from '../../../store/useCategoryStore';
import { DoubleSlider } from '../../../components/slider/DoubleSlider';
import { SortOptions } from './sort-section/SortOptions';

type CategoryListType = {
  categoryList: CategoryResults[];
};

export const CategoryList = ({ categoryList }: CategoryListType) => {
  const addCategories = useCategoryStore((state) => state.addCategories);
  const isMovie = useCategoryStore((state) => state.isMovie);
  const isDiscounted = useCategoryStore((state) => state.isDiscounted);
  const setSortingCriteria = useCategoryStore((state) => state.setSortingCriteria);
  const setSortingValue = useCategoryStore((state) => state.setSortingValue);
  const setPriceMin = useCategoryStore((state) => state.setPriceMin);
  const setPriceMax = useCategoryStore((state) => state.setPriceMax);
  const setPositiveCallsMin = useCategoryStore((state) => state.setPositiveCallsMin);
  const setPositiveCallsMax = useCategoryStore((state) => state.setPositiveCallsMax);
  const setSearchWords = useCategoryStore((state) => state.setSearchWords);
  const setCloseCatalog = useCategoryStore((state) => state.setCloseCatalog);

  const searchHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const clicked = event.target as HTMLElement;
      const searchedWordsInput = clicked.nextElementSibling as HTMLInputElement | null;
      if (!searchedWordsInput) return;
      setSearchWords(searchedWordsInput.value);
    },
    [setSearchWords],
  );

  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (event.target instanceof HTMLFormElement) {
        const form = event.target;
        const searchedWordsInput = form.elements.namedItem('searchField') as HTMLInputElement;
        if (searchedWordsInput && searchedWordsInput.value) setSearchWords(searchedWordsInput.value);
        const categorySet = form.elements.namedItem('categoryFieldSet') as HTMLFieldSetElement | null;
        if (categorySet) {
          const formElements = Array.from(categorySet.elements) as HTMLInputElement[];
          const filtered = formElements.filter((elem) => elem.type === 'checkbox' && elem.checked);
          const mapped = filtered.map((box) => box.value);
          addCategories(mapped);
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
          const callsRangeMax = positiveCallsSet.elements.namedItem('minValue') as HTMLInputElement | null;
          callsRangMin && setPositiveCallsMin(callsRangMin.value);
          callsRangeMax && setPositiveCallsMax(callsRangeMax.value);
        }
        const movieSet = form.elements.namedItem('movieFieldSet') as HTMLFieldSetElement | null;
        if (movieSet) {
          const options = movieSet.getElementsByClassName('movieSet') as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          if (found && found.value === 'true') isMovie(true);
          else isMovie(false);
        }
        const discountSet = form.elements.namedItem('discountFieldSet') as HTMLFieldSetElement | null;
        if (discountSet) {
          const options = discountSet.getElementsByClassName(
            'discountSet',
          ) as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          if (found && found.value === 'true') isDiscounted(true);
          else isDiscounted(false);
        }
        const sortingSet = form.elements.namedItem('sortingFieldSet') as HTMLFieldSetElement | null;
        if (sortingSet) {
          const options = sortingSet.getElementsByClassName('sorting') as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          found && setSortingValue(found.value);
          found && found.dataset.name && setSortingCriteria(found.dataset.name);
        }
        setCloseCatalog(true);
      }
    },
    [
      setSearchWords,
      setCloseCatalog,
      addCategories,
      setPriceMin,
      setPriceMax,
      setPositiveCallsMin,
      setPositiveCallsMax,
      isMovie,
      isDiscounted,
      setSortingValue,
      setSortingCriteria,
    ],
  );

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.btnsContainer}>
        <input type="submit" className={styles.formBtn} value="submit" />
        <input type="reset" className={styles.formBtn} value="reset" />
      </div>
      <div className={styles.titleContainer}>{<h2 className={styles.categoryTitle}>Categories</h2>}</div>
      <label className={styles.searchLabel} htmlFor="searchField">
        <span onClick={searchHandler} className={styles.glassImg} />
        <input autoComplete="off" placeholder="Search..." className={styles.searchField} type="text" id="searchField" />
      </label>
      <fieldset className={styles.categoryWrapper} name="categoryFieldSet">
        {categoryList.map((category) => (
          <CheckboxComponent key={category.id} value={category.id}>
            {category.name['en-US']}
          </CheckboxComponent>
        ))}
      </fieldset>
      <fieldset className={styles.priceFilterWrapper} name="priceFieldSet">
        <DoubleSlider title={'Price'} MIN={0} MAX={50000} signs={'C'}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.positiveCallbacksFilterWrapper} name="positiveCallsFieldSet">
        <DoubleSlider title={'Positive Callbacks'} MIN={0} MAX={500}></DoubleSlider>
      </fieldset>
      <SortOptions></SortOptions>
    </form>
  );
};
