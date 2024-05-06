import { useFormik } from 'formik';
import styles from './login-form.module.scss';
import Button from '../button/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface formValues {
  email?: string;
  password?: string | string[];
}

const validate = (values: formValues) => {
  const errors: formValues = {};
  const password = values.password || '';

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  const passwordErrors = [];
  if (!password) {
    passwordErrors.push('Required');
  }
  if (password.length < 8) {
    passwordErrors.push('Password must be at least 8 characters');
  }
  if (!/(?=.*[a-z])/.test(password as string)) {
    passwordErrors.push('Password must contain at least one lowercase letter (a-z)');
  }
  if (!/(?=.*[A-Z])/.test(password as string)) {
    passwordErrors.push('Password must contain at least one uppercase letter (A-Z)');
  }
  if (!/(?=.*\d)/.test(password as string)) {
    passwordErrors.push('Password must contain at least one digit (0-9)');
  }
  if (!/(?=.*[!@#$%^&*])/.test(password as string)) {
    passwordErrors.push('Password must contain at least one special character');
  }
  if (/^\s|\s$/.test(password as string)) {
    passwordErrors.push('Password must not contain leading or trailing whitespace');
  }

  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
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
      navigate('/');
    },
  });

  return (
    <form className={styles.login__form} onSubmit={formik.handleSubmit}>
      <div className={styles.login__form__field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('email', true, false);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.login__form__error}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className={styles.login__form__field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('password', true, false);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        <span className={styles.login__form__pass__ico} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>

        {formik.touched.password && formik.errors.password ? (
          <div className={styles.login__form__error}>
            {Array.isArray(formik.errors.password) ? (
              formik.errors.password.map((error, index) => (
                <div key={index} className={styles.login__form__error}>
                  {error}
                </div>
              ))
            ) : (
              <div>{formik.errors.password}</div>
            )}
          </div>
        ) : null}
      </div>

      <Button style={styles.login__form__btn} title="Login" type="submit"></Button>
    </form>
  );
};
