import styles from './checkboxComponent.module.scss';

type CategoryType = {
  isChecked?: boolean;
  onChange?: (newChecked: boolean) => void;
  children: React.ReactNode;
  value?: string;
  name?: string;
  additionalStyles?: { color: string };
};

export const CheckboxComponent = ({ additionalStyles, name, value, children }: CategoryType) => {
  return (
    <label className={styles.boxContainer} htmlFor={value}>
      <input type="checkbox" className={styles.checkboxInput} id={value} name={name} value={value} />
      <p style={additionalStyles}>{children}</p>
    </label>
  );
};
