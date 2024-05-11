import { FormikProps } from 'formik';

interface FormValues {
  [key: string]: string | undefined;
}

interface SelectFieldProps<T extends FormValues> {
  login__form__field: string;
  style__label: string;
  login__form__input: string;
  label__text: string;
  name: keyof T;
  formik: FormikProps<T>;
  selectList: string[];
}

export default function SelectField<T extends FormValues>({
  login__form__field,
  style__label,
  login__form__input,
  label__text,
  name,
  formik,
  selectList,
}: SelectFieldProps<T>) {
  return (
    <div className={login__form__field}>
      <label className={style__label} htmlFor={name as string}>
        {label__text}
      </label>
      <select
        className={login__form__input}
        style={{ padding: '0 10px' }}
        name={name as string}
        id={name as string}
        onChange={formik.handleChange}
        value={formik.values[name]}
      >
        {selectList.map((item, index) => (
          <option key={index} value={item} label={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
