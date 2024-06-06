import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from './Button';

describe('Button component', () => {
  it('renders button with correct title', () => {
    const { getByText } = render(<Button style="custom" title="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button style="custom" title="Click Me" onClick={handleClick} />);
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    const { container } = render(<Button style="custom" title="Click Me" disabled />);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('applies type attribute correctly', () => {
    const { container } = render(<Button style="custom" title="Click Me" type="submit" />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
