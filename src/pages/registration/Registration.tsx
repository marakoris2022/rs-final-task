import styles from './registration.module.scss';
import RegistrationForm from './register-form/register-form';

export default function Registration() {
  return (
    <main>
      <section>
        <h2 className={styles.registrationPageTitle}>Registration Page</h2>
        <RegistrationForm />
      </section>
    </main>
  );
}
