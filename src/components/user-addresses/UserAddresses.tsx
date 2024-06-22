import styles from './userAddresses.module.scss';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { ModalWindow } from '../modal/ModalWindow';
import {
  DefaultAddressTypes,
  RemoveAddressTypes,
  removeAddress,
  removeAddressType,
  setDefaultAddressType,
  addAddressType,
  AddressTypes,
} from '../../api/commerce-tools-api-profile';
import { EditAddress } from './edit-address/EditAddress';
import { Address } from '../../interfaces/interfaces';
import { countryCodes, countryCodesReverse } from '../../constants/common';

export const UserAddresses = () => {
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const shippingAddresses = useMemo(() => {
    return customer?.addresses?.reduce<Address[]>((acc, address) => {
      if (customer.shippingAddressIds?.includes(address.id || '')) {
        acc.push(address);
      }
      return acc;
    }, []);
  }, [customer?.addresses, customer?.shippingAddressIds]);

  const billingAddresses = useMemo(() => {
    return customer?.addresses?.reduce<Address[]>((acc, address) => {
      if (customer.billingAddressIds?.includes(address.id || '')) {
        acc.push(address);
      }
      return acc;
    }, []);
  }, [customer?.addresses, customer?.billingAddressIds]);

  const handleDeleteAddress = async () => {
    const updatedUser = await removeAddress(customer, addressToDelete);

    setCustomer(updatedUser);

    setShowModal(false);
  };

  const openDeleteModal = (addressId: string | undefined) => {
    setIsLoading(() => true);

    setAddressToDelete(addressId!);

    setShowModal(true);
  };

  const openEditModal = (address: Address) => {
    setIsLoading(() => true);

    setCurrentAddress(address);

    setShowChangeModal(true);
  };

  const handleSetDefaultAddress = async (type: DefaultAddressTypes, addressId?: string) => {
    setIsLoading(() => true);

    const updatedUser = await setDefaultAddressType(customer!, type, addressId);

    setCustomer(updatedUser);

    setIsLoading(() => false);
  };

  const handleChangeAddressType = async (
    typeToRemove: RemoveAddressTypes,
    typeToAdd: AddressTypes,
    addressId?: string,
  ) => {
    setIsLoading(() => true);

    const updatedUser = await addAddressType(customer!, typeToAdd, addressId);

    const updatedUserSecond = await removeAddressType(updatedUser!, typeToRemove, addressId);

    setCustomer(updatedUserSecond);

    setIsLoading(() => false);
  };

  return (
    <>
      <Button
        style={styles.newAddressBtn}
        title={`Add new address`}
        type="button"
        onClick={() => navigate('/profile/addresses/add-address')}
      />
      <div className={styles.addressesWrapper}>
        <div className={styles.shippingAddressesContainer}>
          <h3 className={styles.addressesTitle}>Shipping Addresses</h3>

          {shippingAddresses?.map((currAddress) => {
            const isDefaultAddress = customer?.defaultShippingAddressId === currAddress.id;

            const addressItems = [
              { title: 'First name', value: currAddress.firstName },
              { title: 'Last name', value: currAddress.lastName },
              { title: 'Country', value: countryCodesReverse[currAddress.country] },
              { title: 'Postal Code', value: currAddress.postalCode },
              { title: 'City', value: currAddress.city },
              { title: 'Street', value: currAddress.streetName },
            ];

            return (
              <div className={styles.addressContainer} key={currAddress.id}>
                <div className={styles.addressWrapper}>
                  {addressItems.map((item, index) => (
                    <div key={index} className={styles.addressItemContainer}>
                      <h4>{item.title}:</h4>
                      <div className={styles.addressValue}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.addressManageContainer}>
                  <div className={styles.addressManageBtnsContainer}>
                    {isDefaultAddress && <div className={styles.addressDefault}>Default shipping</div>}

                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as default"
                        type="button"
                        onClick={async () => {
                          await handleSetDefaultAddress(DefaultAddressTypes.SHIPPING, currAddress!.id);
                        }}
                        disabled={isLoading}
                      />
                    )}

                    <Button
                      style={styles.setDefaultAddressBtn}
                      title="Set as billing"
                      type="button"
                      onClick={() => {
                        handleChangeAddressType(RemoveAddressTypes.SHIPPING, AddressTypes.BILLING, currAddress.id);
                      }}
                      disabled={isLoading}
                    />
                  </div>

                  <div className={styles.addressIconsContainer}>
                    <FaEdit onClick={() => !isLoading && openEditModal(currAddress)} />
                    <FaTrash onClick={() => !isLoading && openDeleteModal(currAddress.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.billingAddressesContainer}>
          <h3 className={styles.addressesTitle}>Billing Addresses</h3>

          {billingAddresses?.map((currAddress) => {
            const isDefaultAddress = customer?.defaultBillingAddressId === currAddress.id;

            const addressItems = [
              { title: 'First name', value: currAddress.firstName },
              { title: 'Last name', value: currAddress.lastName },
              { title: 'Country', value: countryCodesReverse[currAddress.country] },
              { title: 'Postal Code', value: currAddress.postalCode },
              { title: 'City', value: currAddress.city },
              { title: 'Street', value: currAddress.streetName },
            ];

            return (
              <div className={styles.addressContainer} key={currAddress.id}>
                <div className={styles.addressWrapper}>
                  {addressItems.map((item, index) => (
                    <div key={index} className={styles.addressItemContainer}>
                      <h4>{item.title}:</h4>
                      <div className={styles.addressValue}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.addressManageContainer}>
                  <div className={styles.addressManageBtnsContainer}>
                    {isDefaultAddress && <div className={styles.addressDefault}>Default billing</div>}
                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as default"
                        type="button"
                        onClick={async () => {
                          await handleSetDefaultAddress(DefaultAddressTypes.BILLING, currAddress!.id);
                        }}
                        disabled={isLoading}
                      />
                    )}

                    <Button
                      style={styles.setDefaultAddressBtn}
                      title="Set as shipping"
                      type="button"
                      onClick={() => {
                        handleChangeAddressType(RemoveAddressTypes.BILLING, AddressTypes.SHIPPING, currAddress.id);
                      }}
                      disabled={isLoading}
                    />
                  </div>

                  <div className={styles.addressIconsContainer}>
                    <FaEdit onClick={() => !isLoading && openEditModal(currAddress)} />
                    <FaTrash onClick={() => !isLoading && openDeleteModal(currAddress.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showChangeModal && (
        <ModalWindow
          onClose={() => {
            setShowChangeModal(false);
            setIsLoading(() => false);
          }}
          children={
            <EditAddress
              onClose={() => {
                setShowChangeModal(false);
                setIsLoading(() => false);
              }}
              address={currentAddress}
            />
          }
        />
      )}

      {showModal && (
        <ModalWindow
          message="Are you sure you want to delete this address?"
          onClose={() => {
            setShowModal(false);
            setIsLoading(() => false);
          }}
          secondBtn="Confirm"
          onConfirm={() => {
            handleDeleteAddress();
            setIsLoading(() => false);
          }}
        />
      )}
    </>
  );
};
