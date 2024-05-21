import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { customRender } from '../../../test/test-utilities';

// Mock Navigation component
vi.mock('./Navigation', () => ({
  default: () => <nav>Navigation</nav>,
}));

describe('Header', () => {
  it('renders Header component with h2 and Navigation', () => {
    customRender(<Header />);

    // Check if h2 element with text 'Header' is in the document
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Header');
  });
});
