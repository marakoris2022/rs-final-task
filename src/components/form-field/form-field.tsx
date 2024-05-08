import { FormikProps } from 'formik';
import { FormValues } from '../login-form/login-form';

interface FormFieldProps<T extends FormValues> {
  stylesField?: string;
  stylesError?: string;
  showError?: boolean;
  formik: FormikProps<T>;
  labelText: string;
  id: string;
  name: keyof T;
  type: string;
  autoComplete?: string;
  children?: React.ReactNode;
}

const FormField = <T extends FormValues>({
  stylesField,
  stylesError,
  showError = true,
  formik,
  labelText,
  id,
  name,
  type,
  autoComplete,
  children,
}: FormFieldProps<T>) => {
  return (
    <div className={stylesField}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name as string}
        type={type}
        autoComplete={autoComplete}
        onChange={(e) => {
          formik.handleChange(e);
          formik.setFieldTouched(name as string, true, false);
        }}
        onBlur={() => {
          formik.handleBlur(name);
        }}
        value={formik.values?.name}
      />
      {children}
      {showError && formik.touched[name] && formik.errors[name] ? (
        <div className={stylesError}>{formik.errors[name] as string}</div>
      ) : null}
    </div>
  );
};

export default FormField;
