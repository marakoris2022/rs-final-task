import { useFormik } from 'formik';
import styles from './login-form.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button.tsx';
import { FormValues } from '../../../interfaces/interfaces.ts';
import FormField from '../../../components/form-field/form-field.tsx';
import { login } from '../../../utils/commers-tools-api.ts';
import { ModalError } from '../../../components/modal-error/modal-error.tsx';
import { useIsLoggedContext } from '../../../utils/islogged-context.tsx';

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
  const [error, setError] = useState('');
  const { setIsLoggedUser } = useIsLoggedContext();

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
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        await login(email, password);
        navigate('/');
        setIsLoggedUser(() => true);
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
    <form className={styles.login__form} onSubmit={formik.handleSubmit}>
      <FormField
        stylesField={styles.login__form__field}
        stylesError={styles.login__form__error}
        stylesInput={styles.login__form__input}
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
        stylesField={styles.login__form__field}
        stylesError={styles.login__form__error}
        stylesInput={styles.login__form__input}
        isRequired={true}
        formik={formik}
        labelText="Password"
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      >
        <span className={styles.login__form__pass__ico} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </FormField>

      <Button style={styles.login__form__btn} title="Login" type="submit" disabled={!formik.isValid || formik.isSubmitting}></Button>

      {error && <ModalError message={error} onClose={() => setError(() => '')} />}
    </form>
  );
};
