import { getCategoryIdByName, getCategoryNameById } from './getCategoryNameById';

describe('getCategoryNameById', () => {
  it('should return the correct category name for a given ID', () => {
    expect(getCategoryNameById('3f591c18-bb78-4e5b-8fe4-e5ec55a9c1b4')).toBe('Action');
    expect(getCategoryNameById('a21a59de-50b3-4a59-be3e-2a687afc5407')).toBe('Indie');
    expect(getCategoryNameById('152689d4-4a83-4698-9ca1-66c6f0960fde')).toBe('Strategy');
    // Add more test cases for other categories as needed
  });

  it('should return null for an invalid category ID', () => {
    expect(getCategoryNameById('invalid-id')).toBeNull();
  });
});

describe('getCategoryIdByName', () => {
  it('should return the correct category ID for a given name', () => {
    expect(getCategoryIdByName('Action')).toBe('3f591c18-bb78-4e5b-8fe4-e5ec55a9c1b4');
    expect(getCategoryIdByName('Indie')).toBe('a21a59de-50b3-4a59-be3e-2a687afc5407');
    expect(getCategoryIdByName('Strategy')).toBe('152689d4-4a83-4698-9ca1-66c6f0960fde');
    // Add more test cases for other categories as needed
  });

  it('should return null for an invalid category name', () => {
    expect(getCategoryIdByName('Invalid Category')).toBeNull();
  });
});
