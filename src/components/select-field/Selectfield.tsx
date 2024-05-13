import { FormikProps } from 'formik';
import React from 'react';

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
  value?: string;
}

export default function SelectField<T extends FormValues>({
  login__form__field,
  style__label,
  login__form__input,
  label__text,
  name,
  formik,
  selectList,
  value,
}: SelectFieldProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    formik.setFieldValue(name as string, selectedValue);
    formik.setFieldTouched(name as string, true, false);
  };

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
        onChange={handleChange}
        value={formik.values[name as string] ?? value}
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
