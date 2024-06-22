import styles from './userBasicInfo.module.scss';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { Button } from '../button/Button';
import { FormField } from '../form-field/FormField';
import { useCustomerStore } from '../../store/useCustomerStore';
import { ModalWindow } from '../modal/ModalWindow';
import { updateBasicUserData } from '../../api/commerce-tools-api-profile';
import { FaEdit } from 'react-icons/fa';
import { areValuesEqual, convertDateToReadableFormat, validateUserBasicInfo as validate } from '../helpers';

export const UserBasicInfo = () => {
  const customer = useCustomerStore((state) => state.customer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);
  const [message, setMessage] = useState('');
  const [isOpenModify, setIsOpenModify] = useState(false);

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
        const updatedUser = await updateBasicUserData(customer!, values);

        updateCustomer(updatedUser);

        setMessage(() => 'Changes saved');

        formik.setTouched({}, false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const errMsg = err.message;
          setMessage(() => errMsg);
        }
      }
    },
  });

  const isModified = useMemo(() => !areValuesEqual(initialValues, formik.values), [formik.values, initialValues]);

  const customerInfo = [
    { label: 'Your Email:', value: customer?.email },
    { label: 'Your First Name:', value: customer?.firstName },
    { label: 'Your Last Name:', value: customer?.lastName },
    { label: 'Your Date of Birth:', value: convertDateToReadableFormat(customer?.dateOfBirth) },
  ];

  return (
    <div>
      <div className={styles.basicInfoContainer}>
        <h3>Your Personal Information</h3>
        <hr />

        {customerInfo.map((info, index) => (
          <div key={index} className={styles.basicInfoItemContainer}>
            <h4>{info.label}</h4>
            <p className={styles.basicInfoItem}>{info.value}</p>
          </div>
        ))}

        <FaEdit className={styles.modifyIco} onClick={() => setIsOpenModify((prev) => !prev)} />
      </div>
      <form className={styles.userForm} onSubmit={formik.handleSubmit}>
        {isOpenModify && (
          <ModalWindow
            children={
              <div className={`${styles.basicInfoContainer} ${styles.basicInfoContainerWithoutMargin}`}>
                <h3>Change Your Personal Info</h3>
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
                />
                <FormField
                  stylesError={styles.profileFormError}
                  stylesInput={styles.profileFormInput}
                  stylesInputWrapper={styles.labelInputContainer}
                  formik={formik}
                  labelText="First Name:"
                  placeholder="First name"
                  id="firstName"
                  name="firstName"
                  type="text"
                />
                <FormField
                  stylesError={styles.profileFormError}
                  stylesInput={styles.profileFormInput}
                  stylesInputWrapper={styles.labelInputContainer}
                  formik={formik}
                  labelText="Last Name:"
                  placeholder="Last name"
                  id="lastName"
                  name="lastName"
                  type="text"
                />
                <FormField
                  stylesError={styles.profileFormError}
                  stylesInput={styles.profileFormInput}
                  stylesInputWrapper={styles.labelInputContainer}
                  formik={formik}
                  labelText="Date of Birth:"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  max="2010-01-01"
                />
                <Button
                  style={styles.profileFormBtn}
                  title="Save"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting || !isModified}
                />
              </div>
            }
            onClose={() => setIsOpenModify(false)}
          />
        )}
        {message && (
          <ModalWindow
            message={message}
            onClose={() => {
              setMessage(() => '');
              setIsOpenModify(false);
            }}
          />
        )}
      </form>
    </div>
  );
};
