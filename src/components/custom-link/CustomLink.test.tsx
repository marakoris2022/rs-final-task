import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { CustomLink } from './CustomLink';
import styles from './customLink.module.scss';

describe('CustomLink component', () => {
  it('renders link with correct text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomLink to="/test" onClick={() => { }}>
          Link Text
        </CustomLink>
      </BrowserRouter>,
    );
    expect(getByText('Link Text')).toBeInTheDocument();
  });

  it('applies active class when link is matched', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomLink to="/" onClick={() => { }}>
          Home
        </CustomLink>
      </BrowserRouter>,
    );
    expect(getByText('Home')).toHaveClass(styles.active);
  });

  it('applies inactive class when link is not matched', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomLink to="/test" onClick={() => { }}>
          Test
        </CustomLink>
      </BrowserRouter>,
    );
    expect(getByText('Test')).toHaveClass(styles.inactive);
  });

  it('calls onClick handler when link is clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <BrowserRouter>
        <CustomLink to="/test" onClick={handleClick}>
          Link Text
        </CustomLink>
      </BrowserRouter>,
    );
    fireEvent.click(getByText('Link Text'));
    expect(handleClick).toHaveBeenCalled();
  });
});
