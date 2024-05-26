import styles from './userAddresses.module.scss';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';

export const UserAddresses = () => {
  const customer = useCustomerStore((state) => state.customer);
  const navigate = useNavigate();
  console.log(customer);

  const handleAddAddress = () => {
    navigate('/profile/addresses/add-address');
  };

  const shippingAddresses = customer?.addresses?.filter((address) =>
    customer.shippingAddressIds?.includes(address.id || ''),
  );

  const billingAddresses = customer?.addresses?.filter((address) =>
    customer.billingAddressIds?.includes(address.id || ''),
  );

  return (
    <div>
      <Button style="dsd" title="Add Address" type="button" onClick={handleAddAddress} />
      <h4>Shipping Addresses</h4>
      {shippingAddresses?.map((item, index) => {
        const isDefaultAddress =
          customer?.defaultBillingAddressId === item.id || customer?.defaultShippingAddressId === item.id;

        return (
          <div className={styles.dd} key={index}>
            <p>Country: {item.country}</p>
            <p>Postal Code: {item.postalCode}</p>
            <p>City: {item.city}</p>
            <p>Street: {item.streetName}</p>
            {isDefaultAddress && <p>Default Address</p>}
          </div>
        );
      })}

      <h4>Billing Addresses</h4>
      {billingAddresses?.map((item, index) => {
        const isDefaultAddress =
          customer?.defaultBillingAddressId === item.id || customer?.defaultShippingAddressId === item.id;

        return (
          <div className={styles.dd} key={index}>
            <p>Country: {item.country}</p>
            <p>Postal Code: {item.postalCode}</p>
            <p>City: {item.city}</p>
            <p>Street: {item.streetName}</p>
            {isDefaultAddress && <p>Default Address</p>}
          </div>
        );
      })}
    </div>
  );
};
