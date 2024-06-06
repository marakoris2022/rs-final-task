// BurgerMenuCatalog.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BurgerMenuCatalog } from './burgerMenuCatalog';
import { vi } from 'vitest';

describe('BurgerMenuCatalog', () => {
  it('renders correctly', () => {
    render(<BurgerMenuCatalog onClick={vi.fn()} />);

    const burgerMenuCatalog = screen.getByTestId('burger-menu-catalog');
    expect(burgerMenuCatalog).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<BurgerMenuCatalog onClick={handleClick} />);

    const burgerMenuCatalog = screen.getByTestId('burger-menu-catalog');
    fireEvent.click(burgerMenuCatalog);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
