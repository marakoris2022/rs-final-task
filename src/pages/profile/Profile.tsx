import styles from './profile.module.scss';
import { useState } from 'react';
import { UserAddresses } from '../../components/user-addresses/UserAddresses';
import { UserPersonalInfo } from '../../components/user-personal-info/UserPersonalInfo';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../../components/button/Button';

export const Profile = () => {
  const customer = useCustomerStore((state) => state.customer);
  const [activeComponent, setActiveComponent] = useState<string>('personal');

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Profile</h2>
        <div className={styles.profileSectionBtnsContainer}>
          <Button
            style={`${styles.profileSectionBtn} ${activeComponent === 'personal' ? styles.active : ''}`}
            title="Personal Info"
            type="button"
            onClick={() => setActiveComponent('personal')}
          />
          <Button
            style={`${styles.profileSectionBtn} ${activeComponent === 'addresses' ? styles.active : ''}`}
            title="Addresses"
            type="button"
            onClick={() => setActiveComponent('addresses')}
          />
        </div>
        <div>
          {activeComponent === 'personal' && <UserPersonalInfo />}
          {activeComponent === 'addresses' && <UserAddresses />}
        </div>
      </section>
    </main>
  );
};
