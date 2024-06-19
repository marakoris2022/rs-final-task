import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { vi } from 'vitest';

type GitHubLinkType = {
  fontSize: string;
  iconWidth: string;
  name: string;
  link: string;
};

vi.mock('../githublink/GitHubLink', () => ({
  GitHubLink: ({ fontSize, iconWidth, name, link }: GitHubLinkType) => (
    <a href={link} style={{ fontSize }}>
      <svg width={iconWidth} height={iconWidth}></svg>
      {name}
    </a>
  ),
}));

vi.mock('../rsschoollogo/RsSchoolLogo', () => ({
  RsSchoolLogo: ({ width }: { width: string }) => <div style={{ width }}>RS School Logo</div>,
}));

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Footer component with RsSchoolLogo and GitHubLinks', () => {
    render(<Footer />);

    // Check if the RsSchoolLogo component is rendered
    expect(screen.getByText('RS School Logo')).toBeInTheDocument();

    // Check if the GitHub links are rendered correctly
    const githubLinks = [
      { name: 'Alexandr', link: 'https://github.com/oxygeniumo2' },
      { name: 'Olga', link: 'https://github.com/lokispirit' },
      { name: 'Sergey', link: 'https://github.com/marakoris2022' },
    ];

    githubLinks.forEach((link) => {
      const anchorElement = screen.getByText(link.name);
      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveAttribute('href', link.link);
      expect(anchorElement).toHaveStyle('font-size: 18px');
      const svgElement = anchorElement.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '18px');
      expect(svgElement).toHaveAttribute('height', '18px');
    });

    // Check if the year is rendered
    expect(screen.getByText('2024y.')).toBeInTheDocument();
  });
});
