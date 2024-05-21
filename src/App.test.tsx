import { screen } from '@testing-library/react';
import { render } from '../test/test-utilities'; // Adjust the import according to your project structure
import App from './App'; // Adjust the import according to your project structure
import { describe, it, expect, vi } from 'vitest';

// Mock components
vi.mock('./components/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('./components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('./pages/Login', () => ({ default: () => <div>Login</div> }));
vi.mock('./pages/Registration', () => ({ default: () => <div>Registration</div> }));
vi.mock('./pages/Profile', () => ({ default: () => <div>Profile</div> }));
vi.mock('./pages/Main', () => ({ default: () => <div>Main</div> }));
vi.mock('./pages/Notfoundpage', () => ({ default: () => <div>Notfoundpage</div> }));

describe('App Routing', () => {
  it('should redirect to the Main page on /login route when logged in', () => {
    render(<App />, { route: '/login' });
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('should render the Registration page on /registration route when not logged in', () => {
    render(<App />, { route: '/registration' });
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('should redirect to the Main page on /registration route when logged in', () => {
    render(<App />, { route: '/registration' });
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});
