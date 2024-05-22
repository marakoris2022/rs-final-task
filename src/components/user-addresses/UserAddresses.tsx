import { UserProps } from '../../interfaces/interfaces';

export const UserAddresses = ({ userData }: { userData: UserProps }) => {
  console.log(userData);
  return (
    <div>
      {userData.addresses?.map((item, index) => {
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
