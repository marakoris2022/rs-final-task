import { useCategoryStore } from '../../store/useCategoryStore';
import styles from './checkboxComponent.module.scss';

type CategoryType = {
  isChecked?: boolean;
  onChange?: (newChecked: boolean) => void;
  children: React.ReactNode;
  value: string;
  name?: string;
  additionalStyles?: { [rule: string]: string };
};

export const CheckboxComponent = ({ isChecked = false, additionalStyles, name, value, children }: CategoryType) => {
  const setCategoryCheckedItems = useCategoryStore((state) => state.setCategoryCheckedItems);
  const removeCategoryCheckedItems = useCategoryStore((state) => state.removeCategoryCheckedItems);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.checked ? setCategoryCheckedItems(value) : removeCategoryCheckedItems(value);
  };

  return (
    <label className={styles.boxContainer} htmlFor={value}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        id={value}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <p style={additionalStyles}>{children}</p>
    </label>
  );
};
