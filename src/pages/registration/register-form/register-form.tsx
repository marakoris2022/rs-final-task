import './register-form.module.scss';
import { FormValues } from '../../../interfaces/interfaces.ts';

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

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.firstName)) {
    errors.firstName = 'First name must contain at least one uppercase letter (A-Z)';
  } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
    errors.firstName = 'First name must contain only letters';
  } else if (values.firstName.length < 1) {
    errors.firstName = 'First name must be at least 1 character';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.lastName)) {
    errors.lastName = 'Last must contain at least one uppercase letter (A-Z)';
  } else if (!/^[a-zA-Z]+$/.test(values.lastName)) {
    errors.lastName = 'Last must contain only letters';
  } else if (values.lastName.length < 1) {
    errors.lastName = 'Last must be at least 1 character';
  }

  // date will not validate by formik

  if (!values.street) {
    errors.street = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.street)) {
    errors.city = 'Street must contain at least one uppercase letter (A-Z)';
  } else if (values.street.length < 4) {
    errors.street = 'Street must be at least 4 character';
  }

  if (!values.city) {
    errors.city = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.city)) {
    errors.city = 'City must contain at least one uppercase letter (A-Z)';
  } else if (!/^[a-zA-Z]+$/.test(values.city)) {
    errors.city = 'City must contain only letters';
  } else if (values.city.length < 4) {
    errors.city = 'City must be at least 4 character';
  }

  if (!values.postal) {
    errors.postal = 'Required';
  } else if (!/^[A-Z0-9]+$/.test(values.postal)) {
    errors.postal = 'Postal Code must contain only uppercase letters and numbers';
  } else if (values.postal.length < 4) {
    errors.postal = 'Postal Code must be at least 4 character';
  }

  const predefinedCountries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

  if (!values.country) {
    errors.country = 'Required';
  } else if (!predefinedCountries.includes(values.country)) {
    errors.country = 'Invalid country';
  }

  return errors;
};

export default function RegistrationForm() {
  return (
    <>
      <input type="text" />
    </>
  );
}
