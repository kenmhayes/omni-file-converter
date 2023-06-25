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
  className?: string;
  placeholderText: string;
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
  const {
    className, onSelectionChange, options, placeholderText,
  } = props;

  const onSelectElementChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange(event.target.value);
  };

  return (
    <div className={className}>
      <Form.Select onChange={onSelectElementChange}>
        <option value="">{placeholderText}</option>
        {
            options.map((option: SelectOption) => createOptionElement(option))
        }
      </Form.Select>
    </div>
  );
}

Select.defaultProps = {
  className: '',
};

export default Select;
