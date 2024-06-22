import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from './About';
import { vi } from 'vitest';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
  };
});

vi.mock('../../components/about-card/AboutCard', () => ({
  AboutCard: ({
    authorName,
    title,
    bio,
    git,
    photo,
  }: {
    authorName: string;
    title: string;
    bio: string;
    git: string;
    photo: string;
  }) => (
    <div>
      <h3>{authorName}</h3>
      <p>{title}</p>
      <p>{bio}</p>
      <img src={photo} alt={authorName} />
      <a href={git}>GitHub</a>
    </div>
  ),
}));

vi.mock('../../components/breadcrumbs/Breadcrumbs', () => ({
  Breadcrumbs: ({ currantPage }: { currantPage: string }) => <div>{currantPage}</div>,
}));

vi.mock('../../components/rsschoollogo/RsSchoolLogo', () => ({
  RsSchoolLogo: ({ width }: { width: string }) => <div style={{ width }}>RS School Logo</div>,
}));

describe('About Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders About page with correct content', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Meet Our Team/i)).toBeInTheDocument();

    expect(screen.getAllByText(/About Us/i)).toHaveLength(2);

    const teamMembers = [
      { name: 'Olga', title: 'Theoretical Master' },
      { name: 'Alexandr', title: 'Anonymous Coder' },
      { name: 'Sergey', title: 'Not the most Important' },
    ];

    teamMembers.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.title)).toBeInTheDocument();
    });

    expect(screen.getByText(/Our Journey Through the Project/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /At the beginning of this project, we had only two participants. Thankfully, a few days later, our team expanded to three./i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/RS School Logo/i)).toBeInTheDocument();
  });
});
