import { RegistrationPrompt } from '../../components/registration-prompt/registration-prompt';
import { LoginForm } from './login-form/login-form';
import './login.scss';

export default function Login() {
  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Login</h2>
        <LoginForm />
        <RegistrationPrompt />
      </section>
    </main>
  );
}
