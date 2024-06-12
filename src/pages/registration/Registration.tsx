import styles from './registration.module.scss';
import { RegistrationForm } from './register-form/RegistrationForm';

export const Registration = () => {
  return (
    <main className={styles.registrationWrapper}>
      <section className={styles.formWrapper}>
        <h2 className={styles.registrationPageTitle}>Registration Page</h2>
        <RegistrationForm />
      </section>
    </main>
  );
};
