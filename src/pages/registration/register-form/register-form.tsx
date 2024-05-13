import styles from './register-form.module.scss';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../../../store/useStore.ts';
import FormField from '../../../components/form-field/form-field.tsx';
import Button from '../../../components/button/Button.tsx';
import SelectField from '../../../components/select-field/Selectfield.tsx';
import { FormValues } from '../../../interfaces/interfaces.ts';
import { ModalWindow } from '../../../components/modal/modal-window.tsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login, signUp } from '../../../api/commers-tools-api.ts';

interface BillingAddressValues {
  street: string;
  city: string;
  postal: string;
  country: string;
}

const selectList = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

const countryCodes: { [key: string]: string } = {
  USA: 'US',
  Canada: 'CA',
  UK: 'GB',
  Australia: 'AU',
  Germany: 'DE',
};

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

  if (!values.street) {
    errors.street = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.street)) {
    errors.street = 'Street must contain at least one uppercase letter (A-Z)';
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

  if (!values.country) {
    errors.country = 'Required';
  } else if (!selectList.includes(values.country)) {
    errors.country = 'Invalid country';
  }

  if (!values.street2) {
    errors.street2 = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.street2)) {
    errors.street2 = 'Street must contain at least one uppercase letter (A-Z)';
  } else if (values.street2.length < 4) {
    errors.street2 = 'Street must be at least 4 character';
  }

  if (!values.city2) {
    errors.city2 = 'Required';
  } else if (!/(?=.*[A-Z])/.test(values.city2)) {
    errors.city2 = 'City must contain at least one uppercase letter (A-Z)';
  } else if (!/^[a-zA-Z]+$/.test(values.city2)) {
    errors.city2 = 'City must contain only letters';
  } else if (values.city2.length < 4) {
    errors.city2 = 'City must be at least 4 character';
  }

  if (!values.postal2) {
    errors.postal2 = 'Required';
  } else if (!/^[A-Z0-9]+$/.test(values.postal2)) {
    errors.postal2 = 'Postal Code must contain only uppercase letters and numbers';
  } else if (values.postal2.length < 4) {
    errors.postal2 = 'Postal Code must be at least 4 character';
  }

  if (!values.country2) {
    errors.country2 = 'Required';
  } else if (!selectList.includes(values.country2)) {
    errors.country2 = 'Invalid country';
  }

  return errors;
};

export default function RegistrationForm() {
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

        <FormField
          stylesField={styles.login__form__field}
          stylesError={styles.login__form__error}
          stylesInput={styles.login__form__input}
          isRequired={true}
          formik={formik}
          labelText="First name"
          placeholder="First name"
          id="firstName"
          name="firstName"
          type="text"
        ></FormField>

        <FormField
          stylesField={styles.login__form__field}
          stylesError={styles.login__form__error}
          stylesInput={styles.login__form__input}
          isRequired={true}
          formik={formik}
          labelText="Last name"
          placeholder="Last name"
          id="lastName"
          name="lastName"
          type="text"
        ></FormField>

        <FormField
          stylesField={styles.login__form__field}
          stylesError={styles.login__form__error}
          stylesInput={styles.login__form__input}
          isRequired={true}
          formik={formik}
          labelText="Date of Birth"
          placeholder="Last name"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          max="2010-01-01"
        ></FormField>

        <div
          style={{
            padding: '10px',
            border: '1px solid lightgray',
            marginBottom: '15px',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '70px',
              top: '-9px',
              backgroundColor: 'white',
              padding: '3px 5px',
              fontSize: '14px',
              color: '#C7B7A3',
            }}
          >
            <span>Shipping Address</span>
          </div>

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="Street"
            placeholder="Street"
            id="street"
            name="street"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="City"
            placeholder="City"
            id="city"
            name="city"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="Postal Code"
            placeholder="Postal Code"
            id="postal"
            name="postal"
            type="text"
          ></FormField>

          <SelectField
            login__form__field={styles.login__form__field}
            style__label={styles.label}
            login__form__input={styles.login__form__input}
            name={'country'}
            label__text={'Select a country: '}
            formik={formik}
            selectList={selectList}
          />

          <FormField
            stylesField={styles.login__form__field__checkbox}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input__checkbox}
            isRequired={true}
            formik={formik}
            labelText="Use this as the default delivery address?"
            placeholder=""
            id="defaultShippingAddress"
            name="defaultShippingAddress"
            type="checkbox"
          ></FormField>
        </div>
        <div
          style={{
            padding: '10px',
            border: '1px solid lightgray',
            marginBottom: '15px',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '70px',
              top: '-9px',
              backgroundColor: 'white',
              padding: '3px 5px',
              fontSize: '14px',
              color: '#C7B7A3',
            }}
          >
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
            style={styles.small__btn}
            type="button"
            title="Copy shipping address"
          />

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="Street"
            placeholder="Street"
            id="street2"
            name="street2"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="City"
            placeholder="City"
            id="city2"
            name="city2"
            type="text"
          ></FormField>

          <FormField
            stylesField={styles.login__form__field}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input}
            isRequired={true}
            formik={formik}
            labelText="Postal Code"
            placeholder="Postal Code"
            id="postal2"
            name="postal2"
            type="text"
          ></FormField>

          <SelectField
            login__form__field={styles.login__form__field}
            style__label={styles.label}
            login__form__input={styles.login__form__input}
            name={'country2'}
            label__text={'Select a country: '}
            formik={formik}
            selectList={selectList}
          />

          <FormField
            stylesField={styles.login__form__field__checkbox}
            stylesError={styles.login__form__error}
            stylesInput={styles.login__form__input__checkbox}
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
          style={styles.login__form__btn}
          title="Sign up"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        />

        <div style={{ paddingTop: '30px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>Have an account?</span>
          <Button style={styles.nav__btn__login} title="Login page" type="button" onClick={() => navigate('/login')} />
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
}
