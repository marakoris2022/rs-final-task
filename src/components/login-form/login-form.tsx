import { useFormik } from 'formik';
import styles from './login-form.module.scss';
import Button from '../button/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../form-field/form-field.tsx';

interface FormValues {
  email?: string;
  password?: string;
}

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (/^\s+|\s+$/.test(values.email)) {
    errors.email = 'Email must not contain leading or trailing whitespace';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (/^\s|\s$/.test(values.password)) {
    errors.password = 'Password must not contain leading or trailing whitespace';
  } else if (!/(?=.*[a-z])/.test(values.password)) {
    errors.password = 'Password must contain at least one lowercase letter (a-z)';
  } else if (!/(?=.*[A-Z])/.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter (A-Z)';
  } else if (!/(?=.*\d)/.test(values.password)) {
    errors.password = 'Password must contain at least one digit (0-9)';
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = 'Password must contain at least one special character';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters';
  }

  return errors;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      console.log('data to api', values);
      {
        /*LOGIC WITH SERVER
        if (resp.code === 200) {
          navigate
        } else {
          error modal
        }
         */
      }
      navigate('/');
    },
  });

  return (
    <form className={styles.login__form} onSubmit={formik.handleSubmit}>
      <FormField
        stylesField={styles.login__form__field}
        stylesError={styles.login__form__error}
        formik={formik}
        labelText="Email"
        id="email"
        name="email"
        type="text"
        autoComplete="email"
      ></FormField>

      <FormField
        stylesField={styles.login__form__field}
        stylesError={styles.login__form__error}
        showError={true}
        formik={formik}
        labelText="Password"
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      >
        <span className={styles.login__form__pass__ico} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </FormField>

      <Button style={styles.login__form__btn} title="Login" type="submit"></Button>
    </form>
  );
};
