import styles from './profile.module.scss';
import { useEffect, useState } from 'react';
import { UserAddresses } from '../../components/user-addresses/UserAddresses';
import { UserPersonalInfo } from '../../components/user-personal-info/UserPersonalInfo';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../../components/button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading/Loading';

enum ProfilePaths {
  PERSONAL_INFO = '/profile/personal-info',
  ADDRESSES = '/profile/addresses',
  PROFILE = '/profile',
}

export const Profile = () => {
  const customer = useCustomerStore((state) => state.customer);
  const navigate = useNavigate();
  const location = useLocation();

  const initialComponent = location.pathname.includes(ProfilePaths.PERSONAL_INFO)
    ? ProfilePaths.PERSONAL_INFO
    : ProfilePaths.ADDRESSES;

  const [activeComponent, setActiveComponent] = useState<string>(initialComponent);

  const handleComponentChange = (component: string) => {
    if (activeComponent !== component) {
      setActiveComponent(() => component);

      component === ProfilePaths.PERSONAL_INFO
        ? navigate(ProfilePaths.PERSONAL_INFO)
        : navigate(ProfilePaths.ADDRESSES);
    }
  };

  useEffect(() => {
    if (location.pathname === ProfilePaths.PROFILE) {
      navigate(ProfilePaths.PERSONAL_INFO);
    }
  }, []);

  useEffect(() => {
    location.pathname.includes(ProfilePaths.PERSONAL_INFO)
      ? setActiveComponent(ProfilePaths.PERSONAL_INFO)
      : setActiveComponent(ProfilePaths.ADDRESSES);
  }, [location]);

  if (!customer) {
    return <Loading />;
  }

  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Profile</h2>
        <div className={styles.profileSectionBtnsContainer}>
          <Button
            style={`${styles.profileSectionBtn} ${activeComponent === ProfilePaths.PERSONAL_INFO ? styles.active : ''}`}
            title="Personal Info"
            type="button"
            onClick={() => handleComponentChange(ProfilePaths.PERSONAL_INFO)}
          />
          <Button
            style={`${styles.profileSectionBtn} ${activeComponent === ProfilePaths.ADDRESSES ? styles.active : ''}`}
            title="Addresses"
            type="button"
            onClick={() => handleComponentChange(ProfilePaths.ADDRESSES)}
          />
        </div>
        <div>
          {activeComponent === ProfilePaths.PERSONAL_INFO && <UserPersonalInfo />}
          {activeComponent === ProfilePaths.ADDRESSES && <UserAddresses />}
        </div>
      </section>
    </main>
  );
};
