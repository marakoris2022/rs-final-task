import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutCard } from './AboutCard';

describe('AboutCard', () => {
  const props = {
    authorName: 'John Doe',
    title: 'Software Engineer',
    bio: 'Passionate developer with experience in full-stack development.',
    git: 'https://github.com/johndoe',
    photo: '/path/to/photo.jpg',
  };

  it('renders the author name, title, and bio', () => {
    render(<AboutCard {...props} />);

    expect(screen.getByText(props.authorName)).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.bio)).toBeInTheDocument();
  });

  it('renders the author photo', () => {
    render(<AboutCard {...props} />);

    const imgElement = screen.getByAltText('');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', props.photo);
  });

  it('renders the GitHub link with correct URL', () => {
    render(<AboutCard {...props} />);

    const gitLink = screen.getByText('GitHub');
    expect(gitLink).toBeInTheDocument();
    expect(gitLink).toHaveAttribute('href', props.git);
    expect(gitLink).toHaveAttribute('target', 'blank');
  });

  it('renders the GitHub icon', () => {
    render(<AboutCard {...props} />);

    const gitIcon = screen.getByAltText('GitHub');
    expect(gitIcon).toBeInTheDocument();
    expect(gitIcon).toHaveAttribute('src', '/github_icon.svg');
  });
});
