import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { RegistrationPrompt } from './RegistrationPrompt';

// Mock the useNavigate hook from react-router-dom at the top level
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('RegistrationPrompt component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <RegistrationPrompt />
      </BrowserRouter>,
    );
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
