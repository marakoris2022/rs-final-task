import { useCallback } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';
import styles from './checkboxComponent.module.scss';

type CategoryType = {
  isChecked?: boolean;
  onChange?: (newChecked: boolean) => void;
  children: React.ReactNode;
  value: string;
  name?: string;
  additionalStyles?: { color: string };
};

export const CheckboxComponent = ({ additionalStyles, name, value, children }: CategoryType) => {
  const categoryCheckedItems = useCategoryStore((state) => state.categoryCheckedItems);
  const setCategoryCheckedItems = useCategoryStore((state) => state.setCategoryCheckedItems);

  const handleCategoryItem = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const box = event.target;
      if (box instanceof HTMLInputElement) {
        box.checked === true
          ? setCategoryCheckedItems([box.value, true, false])
          : setCategoryCheckedItems([box.value, false, false]);
      }
    },
    [setCategoryCheckedItems],
  );

  return (
    <label className={styles.boxContainer} htmlFor={value}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        id={value}
        name={name}
        value={value}
        checked={categoryCheckedItems.includes(value)}
        onChange={handleCategoryItem}
      />
      <p style={additionalStyles}>{children}</p>
    </label>
  );
};
