import { FormikProps } from 'formik';
import React from 'react';

type FormValues = {
  [key: string]: string | undefined;
};

type SelectFieldProps<T extends FormValues> = {
  loginFormField: string;
  styleLabel: string;
  loginFormInput: string;
  labelText: string;
  name: keyof T;
  formik: FormikProps<T>;
  selectList: string[];
  value?: string;
};

export const SelectField = <T extends FormValues>({
  loginFormField,
  styleLabel,
  loginFormInput,
  labelText,
  name,
  formik,
  selectList,
  value,
}: SelectFieldProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    formik.setFieldValue(name as string, selectedValue);
    formik.setFieldTouched(name as string, true, false);
  };

  return (
    <div className={loginFormField}>
      <label className={styleLabel} htmlFor={name as string}>
        {labelText}
      </label>
      <select
        className={loginFormInput}
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
};
