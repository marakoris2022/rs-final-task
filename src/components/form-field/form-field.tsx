import { Formik } from 'formik';

interface FormFieldProps {
  stylesField: string;
  stylesError: string;
  showError?: boolean;
  formik: Formik;
  labelText: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
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
}) => {
  return (
    <div className={stylesField}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        onChange={(e) => {
          formik.handleChange(e);
          formik.setFieldTouched(name, true, false);
        }}
        onBlur={() => {
          formik.handleBlur(name);
        }}
        value={formik.values.name}
      />
      {children}
      {showError && formik.touched[name] && formik.errors[name] ? (
        <div className={stylesError}>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default FormField;
