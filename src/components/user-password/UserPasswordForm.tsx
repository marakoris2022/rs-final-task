import styles from './userPasswordForm.module.scss';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FormField } from '../form-field/FormField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '../button/Button';
import { ModalWindow } from '../modal/ModalWindow';
import { useCustomerStore } from '../../store/useCustomerStore';
import { updateUserPassword } from '../../api/commerce-tools-api-profile';
import { login } from '../../api/commers-tools-api';
import { validateUserPasswordForm as validate } from '../helpers';

export const UserPasswordForm = () => {
  const customer = useCustomerStore((state) => state.customer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');

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
        const updatedUser = await updateUserPassword(customer!, values);
        updateCustomer(updatedUser);
        setMessage(() => 'Password successfully changed');
        await login(customer!.email, values.newPassword);
        formik.resetForm();
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setMessage(() => errMsg);
          formik.setFieldValue('currentPassword', '');
        }
      }
    },
  });

  return (
    <form className={styles.userPasswordForm} onSubmit={formik.handleSubmit}>
      <div className={styles.passwordFormContainer}>
        <h3>Change Your Password</h3>
        <hr />

        <FormField
          stylesError={styles.profileFormError}
          stylesInput={styles.profileFormInput}
          stylesInputWrapper={styles.labelInputContainer}
          formik={formik}
          labelText="Current Password:"
          id="currentPassword"
          name="currentPassword"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
        >
          <span className={styles.profileFormPassIco} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </FormField>

        <FormField
          stylesError={styles.profileFormError}
          stylesInput={styles.profileFormInput}
          stylesInputWrapper={styles.labelInputContainer}
          formik={formik}
          labelText="New Password:"
          id="newPassword"
          name="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          autoComplete="current-password"
        >
          <span className={styles.profileFormPassIco} onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </FormField>

        <Button
          style={styles.profileFormBtn}
          title="Change Password"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
        />

        {message && <ModalWindow message={message} onClose={() => setMessage(() => '')} />}
      </div>
    </form>
  );
};
