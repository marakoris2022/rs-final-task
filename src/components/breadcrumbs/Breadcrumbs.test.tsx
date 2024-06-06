import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('renders breadcrumb links for current path', () => {
    renderWithRouter(<Breadcrumbs />, { route: '/category/product' });

    expect(screen.getByText('category')).toBeInTheDocument();
    expect(screen.getByText('category').closest('a')).toHaveAttribute('href', '/category');
    expect(screen.getByText('product')).toBeInTheDocument();
    expect(screen.getByText('product').closest('a')).not.toBeInTheDocument();
  });

  it('renders breadcrumb links with currantPage and subPage correctly', () => {
    renderWithRouter(<Breadcrumbs currantPage="Product Name" subPage="Category Name" />, { route: '/category/123' });

    expect(screen.getByText('Category Name')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Product Name').closest('a')).not.toBeInTheDocument();
  });
});
