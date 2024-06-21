import { useFormik } from 'formik';
import styles from './loginForm.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '../../../components/button/Button.tsx';
import { FormField } from '../../../components/form-field/FormField.tsx';
import { login } from '../../../api/commers-tools-api.ts';
import { ModalWindow } from '../../../components/modal/ModalWindow.tsx';
import { useStore } from '../../../store/useStore.ts';
import { validateLoginForm as validate } from '../../../components/helpers.ts';

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
