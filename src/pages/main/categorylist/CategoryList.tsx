import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { Category } from './category/Category';
import { CategoryResults } from '../../../api/catalogue-api';
import { useStore } from 'zustand';

type CategoryListType = {
  categoryList: CategoryResults[];
};

export const CategoryList = ({ categoryList }: CategoryListType) => {
  /* const addCategories = useStore(state => state.addSelectedCategories); */

  const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*  if (event.currentTarget instanceof HTMLFormElement) {
       const form = event.currentTarget;
       const selectedCategories = Array.from(form.elements)
         .filter((elem) => elem instanceof HTMLInputElement && elem.hasAttribute('checked') && elem.checked === true)
         .map((box) => {
           if (box instanceof HTMLInputElement) {
             return box.value;
           }
         });
       addCategories(selectedCategories);
     } */
  }, []);

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.titleContainer}>
        <h2 className={styles.categoryTitle}>Categories</h2>
        <input type="submit" className={styles.submitBtn} value="submit" />
      </div>
      {categoryList.map((category) => (
        <Category key={category.id} value={category.id}>
          {category.name['en-US']}
        </Category>
      ))}
    </form>
  );
};
