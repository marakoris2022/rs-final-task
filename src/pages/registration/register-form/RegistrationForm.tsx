import styles from './registrationForm.module.scss';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../../../store/useStore.ts';
import { FormField } from '../../../components/form-field/FormField.tsx';
import { Button } from '../../../components/button/Button.tsx';
import { SelectField } from '../../../components/select-field/SelectField.tsx';
import { ModalWindow } from '../../../components/modal/ModalWindow.tsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login, signUp } from '../../../api/commers-tools-api.ts';
import { setCartToCustomerById } from '../../../api/commerce-tools-api-cart.ts';
import { useCartStore } from '../../../store/useCartStore.ts';
import { countryCodes } from '../../../constants/common.ts';
import { selectList, validateRegistrationForm as validate } from '../../../components/helpers.ts';

type BillingAddressValues = {
  street: string;
  city: string;
  postal: string;
  country: string;
};

export const RegistrationForm = () => {
  const setLogged = useStore((state) => state.setLogged);
  const cart = useCartStore((state) => state.cart);

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

  const initialValues = {
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
  };

  const formik = useFormik({
    initialValues,
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

        const newCustomer = await signUp(requestBody);

        await setCartToCustomerById(cart!, newCustomer!.id);

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
  );
};
