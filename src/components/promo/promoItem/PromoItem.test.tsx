import { render, screen } from '@testing-library/react';
import { PromoItem } from './PromoItem';

const promoItemProps = {
  title: 'Test Promo',
  discountClass: 'rsteamDiscount',
  discountName: 'rsteam10off',
  discountValue: '10',
};

describe('PromoItem', () => {
  test('renders correctly', () => {
    render(<PromoItem {...promoItemProps} />);
    expect(screen.getByText(/Test Promo/)).toBeInTheDocument();
    expect(screen.getByText(/rsteam10off/)).toBeInTheDocument();
    expect(screen.getByText(/-10%/)).toBeInTheDocument();
  });
});
