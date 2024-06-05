import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { customRender } from '../../../test/test-utilities';

vi.mock('./Navigation', () => ({
  default: () => <nav>Navigation</nav>,
}));

describe('Header', () => {
  it('renders Header component with h2 and Navigation', () => {
    customRender(<Header />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Header');
  });
});
