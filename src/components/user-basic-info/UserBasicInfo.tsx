import styles from './userbasicinfo.module.scss';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { FormField } from '../form-field/FormField';
import { useCustomerStore } from '../../store/useCustomerStore';
import { FormValues } from '../../interfaces/interfaces';

const EMAIL_WHITESPACE_REGEX = /^\s+|\s+$/;
const EMAIL_FORMAT_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NAME_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NAME_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const areValuesEqual = (initialValues: any, currentValues: any): boolean => {
  return Object.keys(initialValues).every((key) => initialValues[key] === currentValues[key]);
};

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (EMAIL_WHITESPACE_REGEX.test(values.email)) {
    errors.email = 'Email must not contain leading or trailing whitespace';
  } else if (!EMAIL_FORMAT_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (!NAME_UPPERCASE_REGEX.test(values.firstName)) {
    errors.firstName = 'First name must contain at least one uppercase letter (A-Z)';
  } else if (!NAME_LETTERS_ONLY_REGEX.test(values.firstName)) {
    errors.firstName = 'First name must contain only letters';
  } else if (values.firstName.length < 1) {
    errors.firstName = 'First name must be at least 1 character';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (!NAME_UPPERCASE_REGEX.test(values.lastName)) {
    errors.lastName = 'Last name must contain at least one uppercase letter (A-Z)';
  } else if (!NAME_LETTERS_ONLY_REGEX.test(values.lastName)) {
    errors.lastName = 'Last name must contain only letters';
  } else if (values.lastName.length < 1) {
    errors.lastName = 'Last name must be at least 1 character';
  }

  return errors;
};

export const UserBasicInfo = () => {
  const customer = useCustomerStore((state) => state.customer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);
  const [isModified, setIsModified] = useState(false);

  const initialValues = {
    email: customer?.email || '',
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    dateOfBirth: customer?.dateOfBirth || '',
  };

  const formik = useFormik({
    initialValues,
    validate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        updateCustomer(values);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          console.log(errMsg);
        }
      }
    },
  });

  useEffect(() => {
    const checkIfModified = () => {
      setIsModified(!areValuesEqual(initialValues, formik.values));
    };

    checkIfModified();
  }, [formik.values, initialValues]);

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
        isRequired={true}
        formik={formik}
        labelText="First name"
        placeholder="First name"
        id="firstName"
        name="firstName"
        type="text"
      ></FormField>

      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        isRequired={true}
        formik={formik}
        labelText="Last name"
        placeholder="Last name"
        id="lastName"
        name="lastName"
        type="text"
      ></FormField>

      <FormField
        stylesField={styles.loginFormField}
        stylesError={styles.loginFormError}
        stylesInput={styles.loginFormInput}
        isRequired={true}
        formik={formik}
        labelText="Date of Birth"
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        max="2010-01-01"
      ></FormField>

      <Button
        style={styles.loginFormBtn}
        title="Save"
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting || !isModified}
      />
    </form>
  );
};
