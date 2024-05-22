// import './main.scss';

import { useState } from 'react';
import Button from '../../components/button/Button';
import { UserAddresses } from '../../components/user-addresses/UserAddresses';
import { UserPersonalInfo } from '../../components/user-personal-info/UserPersonalInfo';
import { useCustomerStore } from '../../store/useCustomerStore';

export default function Profile() {
  const customer = useCustomerStore((state) => state.customer);
  const [activeComponent, setActiveComponent] = useState<string>('personal');

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section>
        <h2>Profile Page</h2>
        <div>
          <Button
            style="sadsa"
            title="Personal Information"
            type="button"
            onClick={() => setActiveComponent('personal')}
          />
          <Button style="sadsa" title="Addresses" type="button" onClick={() => setActiveComponent('addresses')} />
        </div>
        <div>
          {activeComponent === 'personal' && <UserPersonalInfo userData={customer} />}
          {activeComponent === 'addresses' && <UserAddresses userData={customer} />}
        </div>
      </section>
    </main>
  );
}
