import { useCallback } from 'react';
import { FormikProps } from 'formik';
import { FormValues } from '../../interfaces/interfaces';

import styles from './formField.module.scss';

type FormFieldProps<T extends FormValues> = {
  formik: FormikProps<T>;
  labelText: string;
  id: string;
  name: keyof T;
  type: string;
  stylesField?: string;
  stylesError?: string;
  stylesInput?: string;
  stylesInputWrapper?: string;
  showError?: boolean;
  isRequired?: boolean;
  autoComplete?: string;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
};

enum FieldColors {
  RED = '#D20062',
  GREEN = '#AFD198',
  BLUE = '#8B93FF',
}

export const FormField = <T extends FormValues>({
  stylesField,
  stylesError,
  stylesInput,
  stylesInputWrapper,
  showError = true,
  isRequired = false,
  formik,
  labelText,
  placeholder,
  id,
  name,
  type,
  autoComplete,
  children,
  min,
  max,
  disabled = false,
}: FormFieldProps<T>) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.handleChange(e);
      formik.setFieldTouched(name as string, true, false);
    },
    [formik, name],
  );

  const getFieldStyle = () => {
    const initialValue = formik.initialValues[name];
    const currValue = formik.values[name];

    if (!formik.touched[name] || (initialValue === currValue && currValue !== '')) {
      return { outlineColor: FieldColors.BLUE };
    }

    if (formik.touched[name] && formik.errors[name]) {
      return { borderColor: FieldColors.RED, outlineColor: FieldColors.RED };
    }

    if (formik.values[name]) {
      return { borderColor: FieldColors.GREEN, outlineColor: FieldColors.GREEN };
    }

    return { outlineColor: FieldColors.BLUE };
  };

  return (
    <div className={stylesField}>
      <div className={stylesInputWrapper ?? ''}>
        <label className={styles.label} htmlFor={id}>
          {labelText}
          {isRequired && <span>*</span>}
        </label>
        <div>
          <input
            className={stylesInput}
            style={getFieldStyle()}
            min={min}
            max={max}
            id={id}
            name={name as string}
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            onChange={handleChange}
            onBlur={() => {
              formik.handleBlur(name);
            }}
            value={formik.values[name]}
            disabled={disabled}
          />
          {children}
        </div>
      </div>
      {showError && formik.touched[name] && formik.errors[name] && (
        <div className={stylesError}>{formik.errors[name] as string}</div>
      )}
    </div>
  );
};
