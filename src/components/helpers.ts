import postalCodesRegexCollection from '../data/json/postal-codes.json';
import { CountryPostalCode, FormValues } from '../interfaces/interfaces';

const NAME_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NAME_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const CITY_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const CITY_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const EMAIL_WHITESPACE_REGEX = /^\s+|\s+$/;
const EMAIL_FORMAT_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const REGEX_LEADING_TRAILING_WHITESPACE = /^\s+|\s+$/;
const REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
const REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
const REGEX_PASSWORD_DIGIT = /(?=.*\d)/;
const REGEX_PASSWORD_SPECIAL_CHARACTER = /(?=.*[!@#$%^&*])/;

const getCountry = (countryName: string): CountryPostalCode | undefined => {
  const countryInList: CountryPostalCode | undefined = postalCodesRegexCollection.find(
    (country) => country['ISO'] === countryName || country['Country'] === countryName,
  );
  return countryInList;
};

export const selectList = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

export const countries: Record<'US' | 'CA' | 'GB' | 'AU' | 'DE', string> = {
  US: 'USA',
  CA: 'Canada',
  GB: 'UK',
  AU: 'Australia',
  DE: 'Germany',
};

export const areValuesEqual = (initialValues: FormValues, currentValues: FormValues): boolean => {
  return Object.keys(initialValues).every((key) => initialValues[key] === currentValues[key]);
};

export function convertDateToReadableFormat(dateString: string | undefined) {
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

export const validateAddress = (values: FormValues) => {
  const errors: FormValues = {};

  if (values.firstName && !NAME_UPPERCASE_REGEX.test(values.firstName)) {
    errors.firstName = 'First name must contain at least one uppercase letter (A-Z)';
  } else if (values.firstName && !NAME_LETTERS_ONLY_REGEX.test(values.firstName)) {
    errors.firstName = 'First name must contain only letters';
  } else if (values.firstName && values.firstName.length < 1) {
    errors.firstName = 'First name must be at least 1 character';
  }

  if (values.lastName && !NAME_UPPERCASE_REGEX.test(values.lastName)) {
    errors.lastName = 'Last name must contain at least one uppercase letter (A-Z)';
  } else if (values.lastName && !NAME_LETTERS_ONLY_REGEX.test(values.lastName)) {
    errors.lastName = 'Last name must contain only letters';
  } else if (values.lastName && values.lastName.length < 1) {
    errors.lastName = 'Last name must be at least 1 character';
  }

  if (!values.street) {
    errors.street = 'Required';
  } else if (values.street.length < 1) {
    errors.street = 'Street must be at least 1 character';
  }

  if (!values.city) {
    errors.city = 'Required';
  } else if (!CITY_UPPERCASE_REGEX.test(values.city)) {
    errors.city = 'City must contain at least one uppercase letter (A-Z)';
  } else if (!CITY_LETTERS_ONLY_REGEX.test(values.city)) {
    errors.city = 'City must contain only letters';
  } else if (values.city.length < 4) {
    errors.city = 'City must be at least 4 characters';
  }

  if (!values.country) {
    errors.country = 'Required';
  } else if (!selectList.includes(values.country)) {
    errors.country = 'Invalid country';
  }

  if (!values.postal) {
    errors.postal = 'Required';
  } else if (values.country && values.postal) {
    const countryInList = getCountry(values.country);

    if (countryInList) {
      const rg = countryInList['Regex'];
      if (!values.postal.match(rg)) {
        errors.postal = `${values.country} postal code example: ${countryInList['Example']}`;
      }
    }
  }

  return errors;
};

export const validateUserBasicInfo = (values: FormValues) => {
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

export const validateUserPasswordForm = (values: FormValues) => {
  const errors: FormValues = {};

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

export const validateBasket = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.promoCode) {
    errors.firstName = 'Required';
  }

  return errors;
};

export const validateLoginForm = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (REGEX_LEADING_TRAILING_WHITESPACE.test(values.email)) {
    errors.email = 'Email must not contain leading or trailing whitespace';
  } else if (!EMAIL_FORMAT_REGEX.test(values.email)) {
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
