import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { CheckboxComponent } from '../../../components/checkbox/CheckboxComponent';
import { CategoryResults } from '../../../api/catalogue-api';
import { useCategoryStore } from '../../../store/useCategoryStore';
import { DoubleSlider } from '../../../components/slider/DoubleSlider';
import { YearPicker } from './year-picker/YearPicker';
import { SortOptions } from './sort-section/SortOptions';

type CategoryListType = {
  categoryList: CategoryResults[];
};

export const CategoryList = ({ categoryList }: CategoryListType) => {
  const addCategories = useCategoryStore((state) => state.addCategories);
  const addYears = useCategoryStore((state) => state.addYears);
  const isDiscounted = useCategoryStore((state) => state.isDiscounted);
  const setSortingCriteria = useCategoryStore((state) => state.setSortingCriteria);
  const setSortingValue = useCategoryStore((state) => state.setSortingValue);
  const setPriceMin = useCategoryStore((state) => state.setPriceMin);
  const setPriceMax = useCategoryStore((state) => state.setPriceMax);
  const setPositiveCallsMin = useCategoryStore((state) => state.setPositiveCallsMin);
  const setPositiveCallsMax = useCategoryStore((state) => state.setPositiveCallsMax);
  const setSearchWords = useCategoryStore((state) => state.setSearchWords);

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
        const releaseSet = form.elements.namedItem('releaseFieldSet') as HTMLFieldSetElement | null;
        if (releaseSet) {
          const releaseYears = releaseSet.elements.namedItem('yearSelect') as HTMLSelectElement | null;
          const yearValues = releaseYears
            ? Array.from(releaseYears.options)
              .filter((item) => item.selected)
              .map((year) => year.value)
            : [];
          yearValues.length > 0 && addYears(yearValues);
        }
        const discountSet = form.elements.namedItem('discountFieldSet') as HTMLFieldSetElement | null;
        if (discountSet) {
          const productOptions = discountSet.elements.namedItem('discountedProducts') as HTMLInputElement[] | null;
          const found =
            productOptions && productOptions.length > 0
              ? Array.from(productOptions).find((item) => item.checked)
              : null;
          found && found.value === 'discounted' && isDiscounted(true);
        }
        const sortingSet = form.elements.namedItem('sortingFieldSet') as HTMLFieldSetElement | null;
        if (sortingSet) {
          const options = sortingSet.getElementsByClassName('sorting') as HTMLCollectionOf<HTMLInputElement> | null;
          const found = options ? Array.from(options).find((item) => item.checked) : null;
          found && setSortingValue(found.value);
          found && setSortingCriteria(found.dataset.name);
        }
      }
    },
    [
      setSearchWords,
      addCategories,
      setPriceMin,
      setPriceMax,
      setPositiveCallsMin,
      setPositiveCallsMax,
      addYears,
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
        <DoubleSlider title={'Price'} MIN={0} MAX={500} signs={'$'}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.positiveCallbacksFilterWrapper} name="positiveCallsFieldSet">
        <DoubleSlider title={'Positive Callbacks'} MIN={0} MAX={500}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.yearFilterWrapper} name="releaseFieldSet">
        <YearPicker></YearPicker>
      </fieldset>
      <SortOptions></SortOptions>
    </form>
  );
};
