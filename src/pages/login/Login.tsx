import './login.scss';
import { LoginForm } from '../../components/login-form/login-form.tsx';

export default function Login() {
  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Login</h2>
        <LoginForm />
      </section>
    </main>
  );
}
