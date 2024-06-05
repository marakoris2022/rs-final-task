import { useFormik } from 'formik';
import styles from './loginForm.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '../../../components/button/Button.tsx';
import { FormValues } from '../../../interfaces/interfaces.ts';
import { FormField } from '../../../components/form-field/FormField.tsx';
import { login } from '../../../api/commers-tools-api.ts';
import { ModalWindow } from '../../../components/modal/ModalWindow.tsx';
import { useStore } from '../../../store/useStore.ts';

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  const REGEX_LEADING_TRAILING_WHITESPACE = /^\s+|\s+$/;
  const REGEX_EMAIL_FORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
  const REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
  const REGEX_PASSWORD_DIGIT = /(?=.*\d)/;
  const REGEX_PASSWORD_SPECIAL_CHARACTER = /(?=.*[!@#$%^&*])/;

  if (!values.email) {
    errors.email = 'Required';
  } else if (REGEX_LEADING_TRAILING_WHITESPACE.test(values.email)) {
    errors.email = 'Email must not contain leading or trailing whitespace';
  } else if (!REGEX_EMAIL_FORMAT.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (REGEX_LEADING_TRAILING_WHITESPACE.test(values.password)) {
    errors.password = 'Password must not contain leading or trailing whitespace';
  } else if (!REGEX_PASSWORD_LOWERCASE.test(values.password)) {
    errors.password = 'Password must contain at least one lowercase letter (a-z)';
  } else if (!REGEX_PASSWORD_UPPERCASE.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter (A-Z)';
  } else if (!REGEX_PASSWORD_DIGIT.test(values.password)) {
    errors.password = 'Password must contain at least one digit (0-9)';
  } else if (!REGEX_PASSWORD_SPECIAL_CHARACTER.test(values.password)) {
    errors.password = 'Password must contain at least one special character !@#$%^&*';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters';
  }

  return errors;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const setLogged = useStore((state) => state.setLogged);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await login(email, password);
        setLogged(true);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setError(() => errMsg);
          formik.setFieldValue('password', '');
        }
      }
    },
  });

  return (
    <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        stylesInputWrapper={styles.loginFormInputWrapper}
        isRequired={true}
        formik={formik}
        labelText="Email"
        placeholder="example@gmail.com"
        id="email"
        name="email"
        type="text"
        autoComplete="email"
      ></FormField>

      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        stylesInputWrapper={styles.loginFormInputWrapper}
        isRequired={true}
        formik={formik}
        labelText="Password"
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      >
        <span className={styles.loginFormPassIco} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </FormField>

      <Button
        style={styles.loginFormBtn}
        title="Login"
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting}
      />

      {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
    </form>
  );
};
