import styles from './addAddress.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../button/Button';
import { useState } from 'react';
import { useFormik } from 'formik';
import { CountryPostalCode, FormValues } from '../../../interfaces/interfaces';
import postalCodesRegexCollection from '../../../data/json/postal-codes.json';
import { FormField } from '../../form-field/FormField';
import { SelectField } from '../../select-field/SelectField';
import { ModalWindow } from '../../modal/ModalWindow';
import { useCustomerStore } from '../../../store/useCustomerStore';
import {
  AddressTypes,
  DefaultAddressTypes,
  addNewAddress,
  setDefaultAddressType,
} from '../../../api/commerce-tools-api-profile';
import { Loading } from '../../loading/Loading';
import { countryCodes } from '../../../constants/common';

const selectList = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

const getCountry = (countryName: string): CountryPostalCode | undefined => {
  const countryInList: CountryPostalCode | undefined = postalCodesRegexCollection.find(
    (country) => country['ISO'] === countryName || country['Country'] === countryName,
  );
  return countryInList;
};

const NAME_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NAME_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const CITY_UPPERCASE_REGEX = /(?=.*[A-Z])/;
const CITY_LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

const validate = (values: FormValues) => {
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

export const AddAddress = () => {
  const navigate = useNavigate();
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      postal: '',
      title: '',
      country: selectList[0],
      isShipping: '',
      isBilling: '',
      defaultShippingAddress: '',
      defaultBillingAddress: '',
    },
    validate,
    onSubmit: async function (values) {
      try {
        const requestBody = {
          firstName: values.firstName || customer!.firstName,
          lastName: values.lastName || customer!.lastName,
          title: 'Dear',
          streetName: values.street,
          postalCode: values.postal,
          city: values.city,
          country: countryCodes[values.country],
        };

        const shippingAddress = { ...requestBody, additionalAddressInfo: AddressTypes.SHIPPING };
        const billingAddress = { ...requestBody, additionalAddressInfo: AddressTypes.BILLING };

        if (values.isShipping && values.isBilling) {
          let shippingAddressAdded = await addNewAddress(customer!, shippingAddress);

          if (values.defaultShippingAddress && shippingAddressAdded?.addresses) {
            shippingAddressAdded = await setDefaultAddressType(
              shippingAddressAdded,
              DefaultAddressTypes.SHIPPING,
              shippingAddressAdded.addresses[shippingAddressAdded.addresses.length - 1].id,
            );
          }

          let billingAddressAdded = await addNewAddress(shippingAddressAdded!, billingAddress);

          if (values.defaultBillingAddress && billingAddressAdded?.addresses) {
            billingAddressAdded = await setDefaultAddressType(
              billingAddressAdded,
              DefaultAddressTypes.BILLING,
              billingAddressAdded.addresses[billingAddressAdded.addresses.length - 1].id,
            );
          }

          setCustomer(billingAddressAdded!);
        } else if (values.isShipping) {
          let shippingAddressAdded = await addNewAddress(customer!, shippingAddress);

          if (values.defaultShippingAddress && shippingAddressAdded?.addresses) {
            shippingAddressAdded = await setDefaultAddressType(
              shippingAddressAdded,
              DefaultAddressTypes.SHIPPING,
              shippingAddressAdded.addresses[shippingAddressAdded.addresses.length - 1].id,
            );
          }

          setCustomer(shippingAddressAdded!);
        } else {
          let billingAddressAdded = await addNewAddress(customer!, billingAddress);

          if (values.defaultBillingAddress && billingAddressAdded?.addresses) {
            billingAddressAdded = await setDefaultAddressType(
              billingAddressAdded,
              DefaultAddressTypes.BILLING,
              billingAddressAdded.addresses[billingAddressAdded.addresses.length - 1].id,
            );
          }

          setCustomer(billingAddressAdded!);
        }

        formik.resetForm();
        setMessage('Address successfully added!');
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setMessage(() => errMsg);
        }
      }
    },
  });

  if (!customer) {
    return <Loading />;
  }

  return (
    <>
      <h2 className={styles.newAddressTitle}>Add new address</h2>
      <form className={styles.addAddressForm} onSubmit={formik.handleSubmit}>
        <div className={styles.addressTypeContainer}>
          <b>
            Address type:<span>*</span>
          </b>
          <FormField
            stylesInputWrapper={styles.checkboxWrapper}
            formik={formik}
            labelText="Shipping"
            placeholder=""
            id="isShipping"
            name="isShipping"
            type="checkbox"
          ></FormField>
          <FormField
            stylesInputWrapper={styles.checkboxWrapper}
            formik={formik}
            labelText="Billing"
            placeholder=""
            id="isBilling"
            name="isBilling"
            type="checkbox"
          ></FormField>
        </div>

        {!formik.values.isShipping && !formik.values.isBilling && formik.dirty && (
          <div className={styles.addAddressFormTypeError}>You need to choose type of address</div>
        )}

        <FormField
          stylesField={styles.addAddressFormField}
          stylesError={styles.addAddressFormError}
          stylesInput={styles.addAddressFormInput}
          stylesInputWrapper={styles.addAddressInputWrapper}
          formik={formik}
          labelText="First name:"
          placeholder="First name"
          id="firstName"
          name="firstName"
          type="text"
        ></FormField>
        {!formik.values.firstName && (
          <div className={styles.defaultText}>If empty, "{customer?.firstName || ''}" will be used</div>
        )}

        <FormField
          stylesField={styles.addAddressFormField}
          stylesError={styles.addAddressFormError}
          stylesInput={styles.addAddressFormInput}
          stylesInputWrapper={styles.addAddressInputWrapper}
          formik={formik}
          labelText="Last name:"
          placeholder="Last name"
          id="lastName"
          name="lastName"
          type="text"
        ></FormField>
        {!formik.values.lastName && (
          <div className={styles.defaultText}>If empty, "{customer?.lastName || ''}" will be used</div>
        )}

        <FormField
          stylesField={styles.addAddressFormField}
          stylesError={styles.addAddressFormError}
          stylesInput={styles.addAddressFormInput}
          stylesInputWrapper={styles.addAddressInputWrapper}
          isRequired={true}
          formik={formik}
          labelText="Street:"
          placeholder="Street"
          id="street"
          name="street"
          type="text"
        ></FormField>

        <FormField
          stylesField={styles.addAddressFormField}
          stylesError={styles.addAddressFormError}
          stylesInput={styles.addAddressFormInput}
          stylesInputWrapper={styles.addAddressInputWrapper}
          isRequired={true}
          formik={formik}
          labelText="City:"
          placeholder="City"
          id="city"
          name="city"
          type="text"
        ></FormField>

        <SelectField
          loginFormField={styles.addAddressFormField}
          styleLabel={styles.label}
          loginFormInput={styles.addAddressFormInput}
          name={'country'}
          labelText={'Select a country: '}
          formik={formik}
          selectList={selectList}
        />

        <FormField
          stylesField={styles.addAddressFormField}
          stylesError={styles.addAddressFormError}
          stylesInput={styles.addAddressFormInput}
          stylesInputWrapper={styles.addAddressInputWrapper}
          isRequired={true}
          formik={formik}
          labelText="Postal Code:"
          placeholder="Postal Code"
          id="postal"
          name="postal"
          type="text"
        ></FormField>

        <FormField
          stylesInputWrapper={styles.checkboxDefaultWrapper}
          stylesError={styles.addAddressFormError}
          formik={formik}
          labelText="Use this as the default shipping address?"
          placeholder=""
          id="defaultShippingAddress"
          name="defaultShippingAddress"
          type="checkbox"
          disabled={Boolean(!formik.values.isShipping)}
        ></FormField>

        <FormField
          stylesInputWrapper={styles.checkboxDefaultWrapper}
          stylesError={styles.addAddressFormError}
          formik={formik}
          labelText="Use this as the default billing address?"
          placeholder=""
          id="defaultBillingAddress"
          name="defaultBillingAddress"
          type="checkbox"
          disabled={Boolean(!formik.values.isBilling)}
        ></FormField>

        <div className={styles.addAddressBtnsContainer}>
          <Button
            style={styles.addAddressBtn + ' ' + styles.addAddressBtnBack}
            title="Back"
            type="button"
            onClick={() => navigate('/profile/addresses')}
          />
          <Button
            style={styles.addAddressBtn}
            title="Confirm"
            type="submit"
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              !formik.dirty ||
              (!formik.values.isShipping && !formik.values.isBilling)
            }
          />
        </div>

        {message && (
          <ModalWindow
            message={message}
            onClose={() => {
              setMessage('');
              navigate('/profile/addresses');
            }}
          />
        )}
      </form>
    </>
  );
};
