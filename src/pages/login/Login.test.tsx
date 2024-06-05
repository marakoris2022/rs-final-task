import { screen } from '@testing-library/react';
import { render } from '../../../test/test-utilities';
import { Login } from './Login';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../login-form/LoginForm', () => ({
  default: () => <form>LoginForm</form>,
}));
vi.mock('../registration-prompt/RegistrationPrompt', () => ({
  default: () => <div>RegistrationPrompt</div>,
}));

describe('Login', () => {
  it('renders Login component with h2, LoginForm, and RegistrationPrompt', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Login');

    expect(screen.getByText(/Email/)).toBeInTheDocument();

    expect(screen.getByText(/Password/)).toBeInTheDocument();
  });
});
