import React from 'react';
import { create } from 'react-test-renderer';
import Select, { SelectOption } from './Select';
import { fireEvent, render } from '@testing-library/react';

it('renders a select form', () => {
  const options: SelectOption[] = [
    { id: '1', displayValue: 'One' },
    { id: '2' , displayValue: 'Two' }
  ]

  const selectionChangeHandler = jest.fn();

  const component = create(
    <Select options={options} onSelectionChange={selectionChangeHandler} placeholderText='Default'/>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the selected option', () => {
    const options: SelectOption[] = [
        { id: '1', displayValue: 'One' },
        { id: '2' , displayValue: 'Two' }
      ]
    
    const selectionChangeHandler = jest.fn();
    const placeholderText = 'Placeholder';
    const { queryByDisplayValue, getByDisplayValue } = render(
        <Select options={options} onSelectionChange={selectionChangeHandler} placeholderText={placeholderText} />
    );

    expect(queryByDisplayValue(placeholderText)).toBeTruthy();

    // Change to a valid option
    fireEvent.change(getByDisplayValue(placeholderText), { target: { value: '1'}});

    expect(queryByDisplayValue('One')).toBeTruthy();
    expect(selectionChangeHandler).toHaveBeenCalled();
});
