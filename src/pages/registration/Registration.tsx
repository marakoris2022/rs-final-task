import './registration.scss';
import RegistrationForm from './register-form/register-form';

export default function Registration() {
  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Registration Page</h2>
        <RegistrationForm />
      </section>
    </main>
  );
}
