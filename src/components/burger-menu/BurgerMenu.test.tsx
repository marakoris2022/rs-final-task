import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BurgerMenu } from './BurgerMenu';

describe('BurgerMenu', () => {
  it('renders correctly when closed', () => {
    render(<BurgerMenu isOpen={false} onClick={vi.fn()} />);

    const burgerMenu = screen.getByTestId('generalBurgerMenu');
    expect(burgerMenu).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<BurgerMenu isOpen={false} onClick={handleClick} />);

    const burgerMenu = screen.getByTestId('generalBurgerMenu');
    fireEvent.click(burgerMenu);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
