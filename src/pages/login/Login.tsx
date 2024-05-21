import { RegistrationPrompt } from '../../components/registration-prompt/registration-prompt';
import { LoginForm } from './login-form/login-form';
import styles from './login.module.scss';

export default function Login() {
  return (
    <main>
      <section>
        <h2 className={styles.loginPageTitle}>Login</h2>
        <LoginForm />
        <RegistrationPrompt />
      </section>
    </main>
  );
}
