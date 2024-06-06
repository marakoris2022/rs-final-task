import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductList } from './ProductsList';
import { ProductType } from '../../../../api/catalogue-api';

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

const productMock2: ProductType = {
  id: '2',
  key: 'product-key-2',
  description: { 'en-US': 'Description 2' },
  masterVariant: {
    images: [
      {
        url: './image2.jpg',
        dimensions: { w: 640, h: 480 },
        label: 'Image 2',
      },
    ],

    prices: [
      {
        id: '599aabc6-880b-4dc4-ba1e-30d79c87bb3c',
        value: {
          centAmount: 299,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
    ],
    attributes: [],
  },
  name: {
    en: 'Product 2',
    ['en-US']: 'Product 2',
  },
  productType: { typeId: 'Product2TypeId', id: 'Product2Id' },
  version: 2.0,
};

describe('ProductList', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <ProductList productList={[productMock, productMock2]} />
      </Router>,
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders correct number of ProductCard components', () => {
    render(
      <Router>
        <ProductList productList={[productMock, productMock2]} />
      </Router>,
    );

    const productCards = screen.getAllByTestId(/product-card-[a-z0-9]+/i);
    expect(productCards).toHaveLength(2);
  });

  it('renders correctly with an empty product list', () => {
    render(
      <Router>
        <ProductList productList={[]} />
      </Router>,
    );

    expect(screen.queryByTestId(/product-card-[a-z0-9]+/i)).toBeNull();
  });

  it('renders correctly with a null product list', () => {
    render(
      <Router>
        <ProductList productList={null} />
      </Router>,
    );

    expect(screen.queryByTestId(/product-card-[a-z0-9]+/i)).toBeNull();
  });
});
