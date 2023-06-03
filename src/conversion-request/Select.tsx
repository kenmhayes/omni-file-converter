import React, { ReactElement, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

/**
 * Required information for a selectable option within the select control
 */
export interface SelectOption {
  id: string,
  displayValue: string,
}

/**
 * Input property args for a select control
 */
export interface SelectProps {
  options: SelectOption[];
  onSelectionChange: (optionId: string) => void;
}

/**
 * Helper function to create react elements for SelectOption
 */
function createOptionElement(option: SelectOption): ReactElement {
  return (
    <option
      value={option.id}
      key={option.id}
    >
      {option.displayValue}
    </option>
  );
}

/**
 * A control for selecting one of multiple options displayed in a drop down list form
 * @returns
 *   a react element
 */
function Select(props: SelectProps) {
  const { onSelectionChange, options } = props;

  const onSelectElementChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const optionId = event.target.value || '';
    onSelectionChange(optionId);
  };

  return (
    <div>
      <Form.Select onChange={onSelectElementChange}>
        <option value="">--Please choose an option--</option>
        {
            options.map((option: SelectOption) => createOptionElement(option))
        }
      </Form.Select>
    </div>
  );
}

export default Select;
