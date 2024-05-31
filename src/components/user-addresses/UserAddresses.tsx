import styles from './userAddresses.module.scss';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
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

const CountryCodes: Record<string, string> = {
  US: 'USA',
  CA: 'Canada',
  GB: 'UK',
  AU: 'Australia',
  DE: 'Germany',
};

export const UserAddresses = () => {
  const customer = useCustomerStore((state) => state.customer);
  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const shippingAddresses = customer?.addresses?.filter((address) =>
    customer.shippingAddressIds?.includes(address.id || ''),
  );

  const billingAddresses = customer?.addresses?.filter((address) =>
    customer.billingAddressIds?.includes(address.id || ''),
  );

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

  const handleSetDefaultAddress = async (addressId: string | undefined, type: DefaultAddressTypes) => {
    setIsLoading(() => true);

    const updatedUser = await setDefaultAddressType(customer!, type, addressId);

    setCustomer(updatedUser);

    setIsLoading(() => false);
  };

  const handleChangeAddressType = async (
    addressId: string | undefined,
    typeToRemove: RemoveAddressTypes,
    typeToAdd: AddressTypes,
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
        title="Add new address"
        type="button"
        onClick={() => navigate('/profile/addresses/add-address')}
      />
      <div className={styles.addressesWrapper}>
        <div className={styles.shippingAddressesContainer}>
          <h3 className={styles.addressesTitle}>Shipping Addresses</h3>

          {shippingAddresses?.map((currAddress) => {
            const isDefaultAddress = customer?.defaultShippingAddressId === currAddress.id;

            return (
              <div className={styles.addressContainer} key={currAddress.id}>
                <div className={styles.addressWrapper}>
                  <div className={styles.addressItemContainer}>
                    <h4>First name:</h4>
                    <div className={styles.addressValue}>{currAddress.firstName}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Last name:</h4>
                    <div className={styles.addressValue}>{currAddress.lastName}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Country:</h4>
                    <div className={styles.addressValue}>{CountryCodes[currAddress.country]}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Postal Code:</h4>
                    <div className={styles.addressValue}>{currAddress.postalCode}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>City:</h4>
                    <div className={styles.addressValue}>{currAddress.city}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Street:</h4>
                    <div className={styles.addressValue}>{currAddress.streetName}</div>
                  </div>
                </div>
                <div className={styles.addressManageContainer}>
                  {isDefaultAddress && <div className={styles.addressDefault}>Default shipping</div>}
                  <div className={styles.addressManageBtnsContainer}>
                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as default"
                        type="button"
                        onClick={async () => {
                          await handleSetDefaultAddress(currAddress!.id, DefaultAddressTypes.SHIPPING);
                        }}
                        disabled={isLoading}
                      />
                    )}
                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as billing"
                        type="button"
                        onClick={() => {
                          handleChangeAddressType(currAddress.id, RemoveAddressTypes.SHIPPING, AddressTypes.BILLING);
                        }}
                        disabled={isLoading}
                      />
                    )}
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

            return (
              <div className={styles.addressContainer} key={currAddress.id}>
                <div className={styles.addressWrapper}>
                  <div className={styles.addressItemContainer}>
                    <h4>First name:</h4>
                    <div className={styles.addressValue}>{currAddress.firstName}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Last name:</h4>
                    <div className={styles.addressValue}>{currAddress.lastName}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Country:</h4>
                    <div className={styles.addressValue}>{CountryCodes[currAddress.country]}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Postal Code:</h4>
                    <div className={styles.addressValue}>{currAddress.postalCode}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>City:</h4>
                    <div className={styles.addressValue}>{currAddress.city}</div>
                  </div>
                  <div className={styles.addressItemContainer}>
                    <h4>Street:</h4>
                    <div className={styles.addressValue}>{currAddress.streetName}</div>
                  </div>
                </div>
                <div className={styles.addressManageContainer}>
                  {isDefaultAddress && <div className={styles.addressDefault}>Default billing</div>}
                  <div className={styles.addressManageBtnsContainer}>
                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as default"
                        type="button"
                        onClick={async () => {
                          await handleSetDefaultAddress(currAddress!.id, DefaultAddressTypes.BILLING);
                        }}
                        disabled={isLoading}
                      />
                    )}
                    {!isDefaultAddress && (
                      <Button
                        style={styles.setDefaultAddressBtn}
                        title="Set as shipping"
                        type="button"
                        onClick={() => {
                          handleChangeAddressType(currAddress.id, RemoveAddressTypes.BILLING, AddressTypes.SHIPPING);
                        }}
                        disabled={isLoading}
                      />
                    )}
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
