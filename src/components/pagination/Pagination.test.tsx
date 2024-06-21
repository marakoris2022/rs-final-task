import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination, { Props } from './Pagination';
import { useCategoryStore } from '../../store/useCategoryStore';

// Mock the Zustand store
vi.mock('../../store/useCategoryStore', () => ({
  useCategoryStore: vi.fn(),
}));

const mockUseCategoryStore = useCategoryStore as unknown as ReturnType<typeof vi.fn>;

describe('Pagination component', () => {
  const mockSetCurrentPage = vi.fn();
  const mockSetOffset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCategoryStore.mockReturnValue({
      limit: 10,
      setOffset: mockSetOffset,
    });
  });

  const renderPagination = (props: Partial<Props> = {}) => {
    const defaultProps: Props = {
      currentPage: 1,
      lastPage: 10,
      maxLength: 7,
      setCurrentPage: mockSetCurrentPage,
    };
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('renders pagination links correctly', () => {
    renderPagination();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables "Previous" button on the first page', () => {
    renderPagination({ currentPage: 1 });
    expect(screen.getByText('Previous')).toHaveClass(/disabled/);
  });

  it('disables "Next" button on the last page', () => {
    renderPagination({ currentPage: 10 });
    expect(screen.getByText('Next')).toHaveClass(/disabled/);
  });

  it('renders ellipsis for skipped pages', () => {
    renderPagination({ currentPage: 5, lastPage: 10, maxLength: 5 });
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
