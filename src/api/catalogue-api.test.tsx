import { getCategories } from './catalogue-api';

describe('Product API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('getCategories should return null when localStorage does not contain token', async () => {
    const accessToken = 'dummyAccessToken';
    const mockCategories = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];
    localStorage.setItem('VITE_E_COMMERCE_KEY', JSON.stringify({ accessToken }));

    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => ({ results: mockCategories }),
    } as Response);

    const result = await getCategories();

    expect(result).toBeNull();
    expect(window.fetch).not.toHaveBeenCalled();
  });
});
