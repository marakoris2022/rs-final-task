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

  const searchHandler = useCallback(() => { }, []);

  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (event.target instanceof HTMLFormElement) {
        const form = event.target;
        const formElements = Array.from(form.elements) as HTMLInputElement[];
        const filtered = formElements.filter((elem) => elem.type === 'checkbox' && elem.checked);
        const mapped = filtered.map((box) => box.value);
        addCategories(mapped);
      }
    },
    [addCategories],
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
      <fieldset className={styles.priceFilterWrapper} name="price-filter">
        <DoubleSlider title={'Price'} MIN={0} MAX={1000}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.positiveCallbacksFilterWrapper} name="positive-callbacks-filter">
        <DoubleSlider title={'Positive Callbacks'} MIN={0} MAX={5000}></DoubleSlider>
      </fieldset>
      <fieldset className={styles.yearFilterWrapper} name="release-year-filter">
        <YearPicker></YearPicker>
      </fieldset>
      <SortOptions></SortOptions>
    </form>
  );
};
