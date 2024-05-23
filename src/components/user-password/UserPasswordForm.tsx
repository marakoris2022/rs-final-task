import styles from './userPasswordForm.module.scss';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FormValues } from '../../interfaces/interfaces';
import { FormField } from '../form-field/FormField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '../button/Button';
import { ModalWindow } from '../modal/ModalWindow';

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  const REGEX_LEADING_TRAILING_WHITESPACE = /^\s+|\s+$/;
  const REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
  const REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
  const REGEX_PASSWORD_DIGIT = /(?=.*\d)/;
  const REGEX_PASSWORD_SPECIAL_CHARACTER = /(?=.*[!@#$%^&*])/;

  if (!values.currentPassword) {
    errors.currentPassword = 'Required';
  } else if (REGEX_LEADING_TRAILING_WHITESPACE.test(values.currentPassword)) {
    errors.currentPassword = 'Password must not contain leading or trailing whitespace';
  } else if (!REGEX_PASSWORD_LOWERCASE.test(values.currentPassword)) {
    errors.currentPassword = 'Password must contain at least one lowercase letter (a-z)';
  } else if (!REGEX_PASSWORD_UPPERCASE.test(values.currentPassword)) {
    errors.currentPassword = 'Password must contain at least one uppercase letter (A-Z)';
  } else if (!REGEX_PASSWORD_DIGIT.test(values.currentPassword)) {
    errors.currentPassword = 'Password must contain at least one digit (0-9)';
  } else if (!REGEX_PASSWORD_SPECIAL_CHARACTER.test(values.currentPassword)) {
    errors.currentPassword = 'Password must contain at least one special character !@#$%^&*';
  } else if (values.currentPassword.length < 8) {
    errors.currentPassword = 'Must be at least 8 characters';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (REGEX_LEADING_TRAILING_WHITESPACE.test(values.newPassword)) {
    errors.newPassword = 'Password must not contain leading or trailing whitespace';
  } else if (!REGEX_PASSWORD_LOWERCASE.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one lowercase letter (a-z)';
  } else if (!REGEX_PASSWORD_UPPERCASE.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one uppercase letter (A-Z)';
  } else if (!REGEX_PASSWORD_DIGIT.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one digit (0-9)';
  } else if (!REGEX_PASSWORD_SPECIAL_CHARACTER.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one special character !@#$%^&*';
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Must be at least 8 characters';
  }

  return errors;
};

export const UserPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values);
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
    <form className={styles.userPasswordForm} onSubmit={formik.handleSubmit}>
      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        stylesInputWrapper={styles.loginFormInputWrapper}
        formik={formik}
        labelText="Current Password:"
        id="currentPassword"
        name="currentPassword"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      >
        <span className={styles.loginFormPassIco} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </FormField>

      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        stylesInputWrapper={styles.loginFormInputWrapper}
        formik={formik}
        labelText="New Password:"
        id="newPassword"
        name="newPassword"
        type={showNewPassword ? 'text' : 'password'}
        autoComplete="current-password"
      >
        <span className={styles.loginFormPassIco} onClick={toggleNewPasswordVisibility}>
          {showNewPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </FormField>

      <Button
        style={styles.loginFormBtn}
        title="Change Password"
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
      />

      {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}
    </form>
  );
};
