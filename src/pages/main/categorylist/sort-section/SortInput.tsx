import styles from './sortOptions.module.scss';

type SortInputProps = {
  id: string;
  name: string;
  value: string;
  title: string;
  optionChecker: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data?: string;
};
export const SortInput = ({ id, name, value, title, optionChecker, handleChange, data }: SortInputProps) => {
  return (
    <div className={styles.radioWrapper}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={optionChecker === id}
        onChange={handleChange}
        data-name={data ? data : ''}
      />
      <label className={styles.radioLabel} htmlFor={id}>
        {title}
      </label>
    </div>
  );
};
