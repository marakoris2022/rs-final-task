import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { ProductType } from '../../../../../api/catalogue-api';

const productMock: ProductType = {
  id: '1',
  key: 'product-key-1',
  description: { ['en-US']: 'Description 1' },
  masterVariant: {
    images: [
      {
        url: './image1.jpg',
        dimensions: { w: 640, h: 480 },
        label: 'Image 1',
      },
    ],
    prices: [
      {
        id: '599aabc6-880b-4dc4-ba1e-30d79c87bb3d',
        value: {
          centAmount: 300,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
    ],
    attributes: [],
  },
  name: {
    en: 'Product 1',
    ['en-US']: 'Product 1',
  },
  productType: { typeId: 'Product1TypeId', id: 'Product1Id' },
  version: 1.0,
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <Router>
        <ProductCard product={productMock} dataTestid="product-card" />
      </Router>,
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});
