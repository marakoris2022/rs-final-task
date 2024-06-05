import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { StoreProvider } from '../../store/context';

vi.mock('../../api/commers-tools-api', () => ({
  getBasicToken: vi.fn(),
}));
vi.mock('../burger-menu/BurgerMenu', () => ({
  BurgerMenu: ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <div data-testid="burger-menu" className={isOpen ? 'open' : 'closed'} onClick={onClick}></div>
  ),
}));
vi.mock('../custom-link/CustomLink', () => ({
  CustomLink: ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('Navigation', () => {
  const renderWithProvider = (ui: React.ReactElement, { isLogged = false, setLogged = vi.fn() } = {}) => {
    const mockStore = { isLogged, setLogged };
    return render(
      <StoreProvider value={mockStore}>
        <MemoryRouter>{ui}</MemoryRouter>
      </StoreProvider>,
    );
  };

  it('renders navigation links correctly for logged out users', () => {
    renderWithProvider(<Navigation />);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('renders navigation links correctly for logged in users', () => {
    renderWithProvider(<Navigation />, { isLogged: true });

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('toggles burger menu state on click', () => {
    renderWithProvider(<Navigation />);

    const burgerMenu = screen.getByTestId('burger-menu');

    expect(burgerMenu).toHaveClass('closed');

    fireEvent.click(burgerMenu);

    expect(burgerMenu).toHaveClass('open');

    fireEvent.click(burgerMenu);

    expect(burgerMenu).toHaveClass('closed');
  });
});
