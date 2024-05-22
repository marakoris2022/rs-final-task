import { RegistrationPrompt } from '../../components/registration-prompt/RegistrationPrompt';
import { LoginForm } from './login-form/LoginForm';
import styles from './login.module.scss';

export const Login = () => {
  return (
    <main>
      <section>
        <h2 className={styles.loginPageTitle}>Login</h2>
        <LoginForm />
        <RegistrationPrompt />
      </section>
    </main>
  );
};
