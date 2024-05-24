import styles from './category.module.scss';

type CategoryType = {
  isChecked?: boolean;
  onChange?: (newChecked: boolean) => void;
  children: React.ReactNode;
  value: string;
};

export const Category = ({ value, children }: CategoryType) => {
  return (
    <label className={styles.boxContainer} htmlFor="categoryBox">
      <input type="checkbox" className={styles.categoryInput} name="categoryBox" value={value} />
      <p>{children}</p>
    </label>
  );
};
