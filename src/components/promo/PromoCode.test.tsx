import { render, screen } from '@testing-library/react';
import { PromoCode } from './PromoCode';

describe('PromoItem', () => {
  test('renders correctly', () => {
    render(<PromoCode />);
    expect(screen.getByText(/All games/)).toBeInTheDocument();
    expect(screen.getByText(/rsteam10off/)).toBeInTheDocument();
    expect(screen.getByText(/-10%/)).toBeInTheDocument();
    expect(screen.getByText(/Racing games/)).toBeInTheDocument();
    expect(screen.getByText(/racing50off/)).toBeInTheDocument();
    expect(screen.getByText(/-50%/)).toBeInTheDocument();
  });
});
