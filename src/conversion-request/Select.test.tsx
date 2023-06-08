import React from 'react';
import { create } from 'react-test-renderer';
import Select, { SelectOption } from './Select';
import { fireEvent, render } from '@testing-library/react';

it('renders a select form', () => {
  const testOptions: SelectOption[] = [
    { id: '1', displayValue: 'One' },
    { id: '2' , displayValue: 'Two' }
  ]

  const testHandler = jest.fn();

  const component = create(
    <Select options={testOptions} onSelectionChange={testHandler} placeholderText='Default'/>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the selected option', () => {
    const testOptions: SelectOption[] = [
        { id: '1', displayValue: 'One' },
        { id: '2' , displayValue: 'Two' }
      ]
    
    const testHandler = jest.fn();
    const defaultText = 'Placeholder';
    const {queryByDisplayValue, getByDisplayValue } = render(
        <Select options={testOptions} onSelectionChange={testHandler} placeholderText={defaultText} />
    );

    expect(queryByDisplayValue(defaultText)).toBeTruthy();

    // Change to a valid option
    fireEvent.change(getByDisplayValue(defaultText), { target: { value: '1'}});

    expect(queryByDisplayValue('One')).toBeTruthy();
    expect(testHandler).toHaveBeenCalled();
});
