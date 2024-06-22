import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers like .toBeInTheDocument()
import { RsSchoolLogo } from './RsSchoolLogo'; // Adjust the import path as per your project structure

describe('RsSchoolLogo', () => {
  it('renders RsSchoolLogo with correct width and link', () => {
    render(<RsSchoolLogo width="200" />);

    const logoLink = screen.getByRole('link', { name: 'rsSchoolLogo' });
    expect(logoLink).toHaveAttribute('href', 'https://app.rs.school/');

    const logoImage = screen.getByAltText('rsSchoolLogo');
    expect(logoImage).toHaveStyle({ width: '100%' });

    const logoContainer = screen.getByRole('img', { name: 'rsSchoolLogo' });
    expect(logoContainer).toHaveStyle({ width: '100%' });
  });

  it('has correct image source', () => {
    render(<RsSchoolLogo width="200" />);

    const logoImage = screen.getByAltText('rsSchoolLogo');
    expect(logoImage).toHaveAttribute('src', '/logo-rsschool3.png');
  });
});
