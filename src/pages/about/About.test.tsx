import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from './About';
import { vi } from 'vitest';

// Mock react-router-dom and correctly cast the actual import
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
  };
});

// Mock AboutCard component
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

// Mock Breadcrumbs component
vi.mock('../../components/breadcrumbs/Breadcrumbs', () => ({
  Breadcrumbs: ({ currantPage }: { currantPage: string }) => <div>{currantPage}</div>,
}));

// Mock RsSchoolLogo component
vi.mock('../../components/rsschoollogo/RsSchoolLogo', () => ({
  RsSchoolLogo: ({ width }: { width: string }) => <div style={{ width }}>RS School Logo</div>,
}));

// Test suite for the About component
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

    // Check for the presence of the main title
    expect(screen.getByText(/Meet Our Team/i)).toBeInTheDocument();

    // Check for the presence of the breadcrumbs
    expect(screen.getAllByText(/About Us/i)).toHaveLength(2);

    // Check for the presence of team members
    const teamMembers = [
      { name: 'Olga', title: 'Theoretical Master' },
      { name: 'Alexandr', title: 'Anonymous Coder' },
      { name: 'Sergey', title: 'Not the most Important' },
    ];

    teamMembers.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.title)).toBeInTheDocument();
    });

    // Check for the presence of the project journey text
    expect(screen.getByText(/Our Journey Through the Project/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /At the beginning of this project, we had only two participants. Thankfully, a few days later, our team expanded to three./i,
      ),
    ).toBeInTheDocument();

    // Check for the presence of the RS School logo
    expect(screen.getByText(/RS School Logo/i)).toBeInTheDocument();
  });
});
