import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import PageLink, { Props } from './PageLink';

describe('PageLink component', () => {
  it('renders an active link', () => {
    const props: Props = { active: true, children: 'Active Link' };
    render(<PageLink {...props} />);
    const linkElement = screen.getByText('Active Link');
    expect(linkElement).toHaveClass(/pageLink/);
    expect(linkElement).toHaveClass(/active/);
    expect(linkElement).toHaveAttribute('aria-current', 'page');
    expect(linkElement.tagName).toBe('A');
  });

  it('renders a disabled link', () => {
    const props: Props = { disabled: true, children: 'Disabled Link' };
    render(<PageLink {...props} />);
    const spanElement = screen.getByText('Disabled Link');
    expect(spanElement).toHaveClass(/pageLink/);
    expect(spanElement).toHaveClass(/disabled/);
    expect(spanElement.tagName).toBe('SPAN');
  });

  it('renders a regular link', () => {
    const props: Props = { children: 'Regular Link' };
    render(<PageLink {...props} />);
    const linkElement = screen.getByText('Regular Link');
    expect(linkElement).toHaveClass(/pageLink/);
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).not.toHaveClass(/active/);
    expect(linkElement).not.toHaveClass(/disabled/);
  });

  it('applies custom class names', () => {
    const props: Props = { className: 'customClass', children: 'Link with Custom Class' };
    render(<PageLink {...props} />);
    const linkElement = screen.getByText('Link with Custom Class');
    expect(linkElement).toHaveClass(/pageLink/i);
    expect(linkElement).toHaveClass(/customClass/i);
  });
});
