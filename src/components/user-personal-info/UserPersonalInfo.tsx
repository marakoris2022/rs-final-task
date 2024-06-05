import styles from './userPersonalInfo.module.scss';
import { UserBasicInfo } from '../user-basic-info/UserBasicInfo';
import { UserPasswordForm } from '../user-password/UserPasswordForm';

export const UserPersonalInfo = () => {
  return (
    <div className={styles.userPersonalInfoContainer}>
      <UserBasicInfo />
      <UserPasswordForm />
    </div>
  );
};
