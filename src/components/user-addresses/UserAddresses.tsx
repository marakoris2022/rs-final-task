import { useCustomerStore } from '../../store/useCustomerStore';

export const UserAddresses = () => {
  const customer = useCustomerStore((state) => state.customer);

  return (
    <div>
      {customer?.addresses?.map((item, index) => {
        return (
          <div key={index}>
            <p>Address:</p>
            <p>Country: {item.country}</p>
            <p>Postal Code: {item.postalCode}</p>
            <p>City: {item.city}</p>
            <p>Street: {item.streetName}</p>
          </div>
        );
      })}
    </div>
  );
};
