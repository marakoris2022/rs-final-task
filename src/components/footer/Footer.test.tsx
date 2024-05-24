import { screen } from '@testing-library/react';
import { Footer } from './Footer'; // Adjust the import path according to your project structure
import { describe, it, expect } from 'vitest';
import { customRender } from '../../../test/test-utilities';

describe('Footer', () => {
  it('renders Footer component with h2', () => {
    customRender(<Footer />);

    // Check if h2 element with text 'Footer' is in the document
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Footer');
  });
});
