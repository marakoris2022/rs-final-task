import { Formik } from 'formik';

interface FormFieldProps {
  styles: string;
  formik: Formik;
  labelText: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ styles, formik, labelText, id, name, type, autoComplete, children }) => {
  return (
    <div className={styles}>
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
    </div>
  );
};

export default FormField;
