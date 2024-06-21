import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { SearchWords } from './SearchWords';

vi.mock('../../store/useCategoryStore');

describe('SearchWords', () => {
  const mockSetPage = vi.fn();
  const mockSetSearchWords = vi.fn();
  const mockSetSearchWordsForFetching = vi.fn();
  const mockSetOffset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetPage.mockReturnValue(1);
    mockSetSearchWords.mockReturnValue('');
    mockSetSearchWordsForFetching.mockReturnValue('');
    mockSetOffset.mockReturnValue(0);
  });

  it('should handle search input change', () => {
    render(<SearchWords setPage={mockSetPage} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Require 3 characters or more')).not.toHaveClass('hidden');
  });

  it('should render search input and suggestion message', () => {
    render(<SearchWords setPage={mockSetPage} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Require 3 characters or more')).toBeInTheDocument();
  });

  it('should show suggestion message on focus with less than 3 characters', () => {
    render(<SearchWords setPage={mockSetPage} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    expect(screen.getByText('Require 3 characters or more')).not.toHaveClass('hidden');
  });
});
