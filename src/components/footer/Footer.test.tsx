import { screen } from '@testing-library/react';
import { Footer } from './Footer';
import { describe, it, expect } from 'vitest';
import { customRender } from '../../../test/test-utilities';

describe('Footer', () => {
  it('renders Footer component with h2', () => {
    customRender(<Footer />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Footer');
  });
});
