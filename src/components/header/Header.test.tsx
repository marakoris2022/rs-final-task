import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { customRender } from '../../../test/test-utilities';

vi.mock('./Navigation', () => ({
  default: () => <nav>Navigation</nav>,
}));

describe('Header', () => {
  it('renders Header component with Logo and RSTeam Games Store', () => {
    customRender(<Header />);

    const logoImg = screen.getByAltText('Logo');
    const logoText = screen.getByText('RSTeam Games Store');

    expect(logoImg).toBeInTheDocument();
    expect(logoText).toBeInTheDocument();
  });
});
