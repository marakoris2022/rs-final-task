// GitHubLink.test.tsx
import { render, screen } from '@testing-library/react';
import { GitHubLink } from './GitHubLink'; // Путь к вашему компоненту GitHubLink

describe('GitHubLink Component', () => {
  const mockProps = {
    name: 'GitHub Repository',
    link: 'https://github.com/example-repo',
    fontSize: '16px',
    iconWidth: '20px',
  };

  it('renders GitHub link and icon', () => {
    render(<GitHubLink {...mockProps} />);

    const linkElement = screen.getByText('GitHub Repository');
    expect(linkElement).toBeInTheDocument();

    const iconElement = screen.getByAltText('gitHubLink');
    expect(iconElement).toBeInTheDocument();

    const linkNode = screen.getByRole('link');
    expect(linkNode).toHaveAttribute('href', 'https://github.com/example-repo');
    expect(linkNode).toHaveStyle({ fontSize: '16px' });

    const iconNode = screen.getByRole('img');
    expect(iconNode).toHaveStyle({ width: '20px' });
  });
});
