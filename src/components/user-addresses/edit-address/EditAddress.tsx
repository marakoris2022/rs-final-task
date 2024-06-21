import styles from './editAddress.module.scss';
import { Button } from '../../button/Button';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Address } from '../../../interfaces/interfaces';
import { FormField } from '../../form-field/FormField';
import { SelectField } from '../../select-field/SelectField';
import { ModalWindow } from '../../modal/ModalWindow';
import { useCustomerStore } from '../../../store/useCustomerStore';
import { changeAddress } from '../../../api/commerce-tools-api-profile';
import { countryCodes } from '../../../constants/common';
import { countries, selectList, validateAddress as validate } from '../../helpers';

type EditAddressProps = {
  onClose: () => void;
  address: Address | null;
};

export const EditAddress = ({ onClose, address }: EditAddressProps) => {
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: address!.firstName,
      lastName: address!.lastName,
      street: address!.streetName,
      city: address!.city,
      postal: address!.postalCode,
      title: '',
      country: countries[address!.country as keyof typeof countries],
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

        const updatedUser = await changeAddress(customer!, requestBody, address!.id);

        setCustomer(updatedUser);

        setMessage(() => 'Address Changed');
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setMessage(() => errMsg);
        }
      }
    },
  });

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', marginTop: 0 }}>Change your Address</h2>
      <form className={styles.addAddressForm} onSubmit={formik.handleSubmit}>
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

        <div className={styles.addAddressBtnsContainer}>
          <Button
            style={styles.addAddressBtn}
            title="Confirm"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
          />
        </div>

        {message && (
          <ModalWindow
            message={message}
            onClose={() => {
              setMessage('');
              onClose();
            }}
          />
        )}
      </form>
    </>
  );
};
