import styles from './userBasicInfo.module.scss';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { Button } from '../button/Button';
import { FormField } from '../form-field/FormField';
import { useCustomerStore } from '../../store/useCustomerStore';
import { FormValues } from '../../interfaces/interfaces';
import { ModalWindow } from '../modal/ModalWindow';
import { updateBasicUserData } from '../../api/commerce-tools-api-profile';

const EMAIL_WHITESPACE_REGEX = /^\s+|\s+$/;
const EMAIL_FORMAT_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NAME_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NAME_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

function convertDateToReadableFormat(dateString: string | undefined) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (dateString) {
    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month, 10) - 1];

    return `${monthName} ${parseInt(day, 10)}, ${year}`;
  }
}

const areValuesEqual = (initialValues: FormValues, currentValues: FormValues): boolean => {
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
  const [message, setMessage] = useState('');

  const initialValues = {
    email: customer?.email || '',
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    dateOfBirth: customer?.dateOfBirth || '',
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        const valuesWithVersion = { ...values, version: customer?.version ? customer.version : 1 };

        if (customer!.id) {
          const { version } = await updateBasicUserData(customer!.id, valuesWithVersion);
          updateCustomer({ ...values, version });
          setMessage(() => 'Changes saved');
          formik.setTouched({}, false);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setMessage(() => errMsg);
        }
      }
    },
  });

  const isModified = useMemo(() => !areValuesEqual(initialValues, formik.values), [formik.values, initialValues]);

  return (
    <div>
      <div className={styles.basicInfoContainer}>
        <h3>Your Personal Information</h3>
        <hr />
        <div className={styles.basicInfoItemContainer}>
          <h4>Your email:</h4>
          <p className={styles.basicInfoItem}>{customer?.email}</p>
        </div>
        <div className={styles.basicInfoItemContainer}>
          <h4>Your name:</h4>
          <p className={styles.basicInfoItem}>{customer?.firstName}</p>
        </div>
        <div className={styles.basicInfoItemContainer}>
          <h4>Your last name:</h4>
          <p className={styles.basicInfoItem}>{customer?.lastName}</p>
        </div>
        <div className={styles.basicInfoItemContainer}>
          <h4>Your date of birth:</h4>
          <p className={styles.basicInfoItem}>{convertDateToReadableFormat(customer?.dateOfBirth)}</p>
        </div>
      </div>
      <form className={styles.userForm} onSubmit={formik.handleSubmit}>
        <div className={styles.basicInfoContainer}>
          <h3>Change Your Personal Information</h3>
          <hr />

          <FormField
            stylesError={styles.profileFormError}
            stylesInput={styles.profileFormInput}
            stylesInputWrapper={styles.labelInputContainer}
            formik={formik}
            labelText="Email:"
            placeholder="example@gmail.com"
            id="email"
            name="email"
            type="text"
            autoComplete="email"
          ></FormField>

          <FormField
            stylesError={styles.profileFormError}
            stylesInput={styles.profileFormInput}
            stylesInputWrapper={styles.labelInputContainer}
            formik={formik}
            labelText="First name:"
            placeholder="First name"
            id="firstName"
            name="firstName"
            type="text"
          ></FormField>

          <FormField
            stylesError={styles.profileFormError}
            stylesInput={styles.profileFormInput}
            stylesInputWrapper={styles.labelInputContainer}
            formik={formik}
            labelText="Last name:"
            placeholder="Last name"
            id="lastName"
            name="lastName"
            type="text"
          ></FormField>

          <FormField
            stylesError={styles.profileFormError}
            stylesInput={styles.profileFormInput}
            stylesInputWrapper={styles.labelInputContainer}
            formik={formik}
            labelText="Date of birth:"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            max="2010-01-01"
          ></FormField>

          <Button
            style={styles.profileFormBtn}
            title="Save"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting || !isModified}
          />

          {message && <ModalWindow message={message} onClose={() => setMessage(() => '')} />}
        </div>
      </form>
    </div>
  );
};
