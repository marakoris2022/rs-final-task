import { UserProps } from '../../interfaces/interfaces';

export const UserPersonalInfo = ({ userData }: { userData: UserProps }) => {
  return (
    <div>
      <p>First Name:</p>
      <p>{userData.firstName}</p>
      <p>Last Name:</p>
      <p>{userData.lastName}</p>
      <p>Date of Birth:</p>
      <p>{userData.dateOfBirth}</p>
    </div>
  );
};
