// src/components/Registration.test.tsx
import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Registration from './Registration';
import { render } from '../../../test/test-utilities';

vi.mock('./RegistrationForm', () => ({
  default: () => <div>Mocked RegistrationForm</div>,
}));

describe('Registration', () => {
  it('renders Registration component with correct elements', () => {
    render(<Registration />);

    expect(screen.getByText(/Registration Page/i)).toBeInTheDocument();

    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(screen.getByText(/First name/)).toBeInTheDocument();
    expect(screen.getByText(/Last name/)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/)).toBeInTheDocument();
  });
});
