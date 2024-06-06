import { render } from '@testing-library/react';

import { CheckboxComponent } from './CheckboxComponent';

describe('CheckboxComponent', () => {
  it('renders checkbox with correct label', () => {
    const labelText = 'Checkbox Label';
    const { getByText } = render(<CheckboxComponent>{labelText}</CheckboxComponent>);
    expect(getByText(labelText)).toBeInTheDocument();
  });

  it('applies additional styles correctly', () => {
    const additionalStyles = { color: 'red' };
    const { getByText } = render(
      <CheckboxComponent additionalStyles={additionalStyles}>Checkbox Label</CheckboxComponent>,
    );
    const label = getByText('Checkbox Label');
    expect(label).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('passes correct props to input element', () => {
    const name = 'testName';
    const value = 'testValue';
    const { getByLabelText } = render(
      <CheckboxComponent name={name} value={value}>
        Checkbox Label
      </CheckboxComponent>,
    );
    const checkbox = getByLabelText('Checkbox Label');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', name);
    expect(checkbox).toHaveAttribute('value', value);
  });
});
