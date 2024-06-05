import styles from './registrationForm.module.scss';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../../../store/useStore.ts';
import { FormField } from '../../../components/form-field/FormField.tsx';
import { Button } from '../../../components/button/Button.tsx';
import { SelectField } from '../../../components/select-field/SelectField.tsx';
import { FormValues, CountryPostalCode } from '../../../interfaces/interfaces.ts';
import { ModalWindow } from '../../../components/modal/ModalWindow.tsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login, signUp } from '../../../api/commers-tools-api.ts';
import postalCodesRegexCollection from '../../../data/json/postal-codes.json';

type BillingAddressValues = {
  street: string;
  city: string;
  postal: string;
  country: string;
};

const getCountry = (countryName: string): CountryPostalCode | undefined => {
  const countryInList: CountryPostalCode | undefined = postalCodesRegexCollection.find(
    (country) => country['ISO'] === countryName || country['Country'] === countryName,
  );
  return countryInList;
};

const selectList = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

const countryCodes: { [key: string]: string } = {
  USA: 'US',
  Canada: 'CA',
  UK: 'GB',
  Australia: 'AU',
  Germany: 'DE',
};

const EMAIL_WHITESPACE_REGEX = /^\s+|\s+$/;
const EMAIL_FORMAT_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const PASSWORD_WHITESPACE_REGEX = /^\s|\s$/;
const PASSWORD_LOWERCASE_REGEX = /(?=.*[a-z])/;
const PASSWORD_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const PASSWORD_DIGIT_REGEX = /(?=.*\d)/;
const PASSWORD_SPECIAL_CHAR_REGEX = /(?=.*[!@#$%^&*])/;

const NAME_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NAME_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const CITY_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const CITY_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const validate = (values: FormValues) => {
  const errors: FormValues = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (EMAIL_WHITESPACE_REGEX.test(values.email)) {
    errors.email = 'Email must not contain leading or trailing whitespace';
  } else if (!EMAIL_FORMAT_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (PASSWORD_WHITESPACE_REGEX.test(values.password)) {
    errors.password = 'Password must not contain leading or trailing whitespace';
  } else if (!PASSWORD_LOWERCASE_REGEX.test(values.password)) {
    errors.password = 'Password must contain at least one lowercase letter (a-z)';
  } else if (!PASSWORD_UPPERCASE_REGEX.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter (A-Z)';
  } else if (!PASSWORD_DIGIT_REGEX.test(values.password)) {
    errors.password = 'Password must contain at least one digit (0-9)';
  } else if (!PASSWORD_SPECIAL_CHAR_REGEX.test(values.password)) {
    errors.password = 'Password must contain at least one special character !@#$%^&';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters';
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

  if (!values.street2) {
    errors.street2 = 'Required';
  } else if (values.street2.length < 1) {
    errors.street2 = 'Street must be at least 1 character';
  }

  if (!values.city2) {
    errors.city2 = 'Required';
  } else if (!CITY_UPPERCASE_REGEX.test(values.city2)) {
    errors.city2 = 'City must contain at least one uppercase letter (A-Z)';
  } else if (!CITY_LETTERS_ONLY_REGEX.test(values.city2)) {
    errors.city2 = 'City must contain only letters';
  } else if (values.city2.length < 4) {
    errors.city2 = 'City must be at least 4 characters';
  }

  if (!values.postal2) {
    errors.postal2 = 'Required';
  } else if (values.country2 && values.postal2) {
    const countryInList2 = getCountry(values.country2);

    if (countryInList2) {
      const rg = countryInList2['Regex'];
      if (!values.postal2.match(rg)) {
        errors.postal2 = `${values.country2} postal code example: ${countryInList2['Example']}`;
      }
    }
  }

  if (!values.country2) {
    errors.country2 = 'Required';
  } else if (!selectList.includes(values.country2)) {
    errors.country2 = 'Invalid country';
  }

  return errors;
};

export const RegistrationForm = () => {
  const setLogged = useStore((state) => state.setLogged);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function fillBillingAddress(props: BillingAddressValues) {
    const { street, city, postal, country } = props;

    await formik.setFieldValue('country2', country);
    await formik.setFieldValue('city2', city);
    await formik.setFieldValue('street2', street);
    await formik.setFieldValue('postal2', postal);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '1990-01-01',
      street: '',
      city: '',
      postal: '',
      title: '',
      street2: '',
      city2: '',
      postal2: '',
      title2: '',
      country: selectList[0],
      country2: selectList[0],
      defaultShippingAddress: '',
      defaultBillingAddress: '',
    },
    validate,
    onSubmit: async function (values) {
      try {
        const requestBody = {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          title: 'Dear',
          isEmailVerified: true,
          shippingAddresses: [0],
          billingAddresses: [1],
          addresses: [
            {
              title: 'Dear',
              firstName: values.firstName,
              lastName: values.lastName,
              streetName: values.street,
              postalCode: values.postal,
              city: values.city,
              country: countryCodes[values.country],
            },
            {
              title: 'Dear',
              firstName: values.firstName,
              lastName: values.lastName,
              streetName: values.street2,
              postalCode: values.postal2,
              city: values.city2,
              country: countryCodes[values.country2],
            },
          ],
        };

        if (values.defaultShippingAddress) {
          Object.assign(requestBody, { defaultShippingAddress: 0 });
        }

        if (values.defaultBillingAddress) {
          Object.assign(requestBody, { defaultBillingAddress: 1 });
        }

        await signUp(requestBody);
        await login(values.email, values.password);

        setRegistrationMessage('Registration Successful!');
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          formik.setFieldValue('password', '');
          setError(() => errMsg);
        }
      }
    },
  });

  return (
    <>
      <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
        <FormField
          stylesField={styles.loginFormField}
          stylesError={styles.loginFormError}
          stylesInput={styles.loginFormInput}
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
          placeholder="Last name"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          max="2010-01-01"
        ></FormField>

        <div className={styles.addressWrapper}>
          <div className={styles.addressWrapperTitle}>
            <span>Shipping Address</span>
          </div>

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="Street"
            placeholder="Street"
            id="street"
            name="street"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="City"
            placeholder="City"
            id="city"
            name="city"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="Postal Code"
            placeholder="Postal Code"
            id="postal"
            name="postal"
            type="text"
          ></FormField>

          <SelectField
            loginFormField={styles.loginFormField}
            styleLabel={styles.label}
            loginFormInput={styles.loginFormInput}
            name={'country'}
            labelText={'Select a country: '}
            formik={formik}
            selectList={selectList}
          />

          <FormField
            stylesField={styles.loginFormFieldCheckbox}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInputCheckbox}
            isRequired={true}
            formik={formik}
            labelText="Use this as the default delivery address?"
            placeholder=""
            id="defaultShippingAddress"
            name="defaultShippingAddress"
            type="checkbox"
          ></FormField>
        </div>

        <div className={styles.addressWrapper}>
          <div className={styles.addressWrapperTitle}>
            <span>Billing Address</span>
          </div>

          <Button
            onClick={() => {
              const billingAddressValues = {
                street: formik.values.street,
                city: formik.values.city,
                postal: formik.values.postal,
                country: formik.values.country,
              };

              fillBillingAddress(billingAddressValues);
            }}
            style={styles.smallBtn}
            type="button"
            title="Copy shipping address"
          />

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="Street"
            placeholder="Street"
            id="street2"
            name="street2"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="City"
            placeholder="City"
            id="city2"
            name="city2"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.loginFormField}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInput}
            isRequired={true}
            formik={formik}
            labelText="Postal Code"
            placeholder="Postal Code"
            id="postal2"
            name="postal2"
            type="text"
          ></FormField>

          <SelectField
            loginFormField={styles.loginFormField}
            styleLabel={styles.label}
            loginFormInput={styles.loginFormInput}
            name={'country2'}
            labelText={'Select a country: '}
            formik={formik}
            selectList={selectList}
          />

          <FormField
            stylesField={styles.loginFormFieldCheckbox}
            stylesError={styles.loginFormError}
            stylesInput={styles.loginFormInputCheckbox}
            isRequired={true}
            formik={formik}
            labelText="Use this as the default billing address?"
            placeholder=""
            id="defaultBillingAddress"
            name="defaultBillingAddress"
            type="checkbox"
          ></FormField>
        </div>

        <Button
          style={styles.loginFormBtn}
          title="Sign up"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        />

        <div className={styles.loginPrompt}>
          <span>Have an account?</span>
          <Button style={styles.navBtnLogin} title="Login page" type="button" onClick={() => navigate('/login')} />
        </div>
        {error && <ModalWindow message={error} onClose={() => setError(() => '')} />}

        {registrationMessage && (
          <ModalWindow
            message={registrationMessage}
            onClose={() => {
              setRegistrationMessage(() => '');
              setLogged(true);
            }}
          />
        )}
      </form>
    </>
  );
};
