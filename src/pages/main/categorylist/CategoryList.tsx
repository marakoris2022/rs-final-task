import { FormEvent, useCallback } from 'react';
import styles from './categories.module.scss';
import { Category } from './category/Category';
import { CategoryResults } from '../../../api/catalogue-api';
import { useCategoryStore } from '../../../store/useCategoryStore';

type CategoryListType = {
  categoryList: CategoryResults[];
};

export const CategoryList = ({ categoryList }: CategoryListType) => {
  const addCategories = useCategoryStore((state) => state.addCategories);

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
