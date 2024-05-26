import styles from './profile.module.scss';
import { useEffect, useState } from 'react';
import { UserAddresses } from '../../components/user-addresses/UserAddresses';
import { UserPersonalInfo } from '../../components/user-personal-info/UserPersonalInfo';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../../components/button/Button';
import { useLocation, useNavigate } from 'react-router-dom';

export const Profile = () => {
  const customer = useCustomerStore((state) => state.customer);
  const navigate = useNavigate();
  const location = useLocation();

  const initialComponent = location.pathname.includes('addresses') ? 'addresses' : 'personal';
  const [activeComponent, setActiveComponent] = useState<string>(initialComponent);

  const handleComponentChange = (component: string) => {
    if (activeComponent !== component) {
      setActiveComponent(() => component);

      if (component === 'personal') {
        navigate('/profile/personal-info');
      } else if (component === 'addresses') {
        navigate('/profile/addresses');
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/personal-info');
    }
  }, []);

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
            onClick={() => handleComponentChange('personal')}
          />
          <Button
            style={`${styles.profileSectionBtn} ${activeComponent === 'addresses' ? styles.active : ''}`}
            title="Addresses"
            type="button"
            onClick={() => handleComponentChange('addresses')}
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
