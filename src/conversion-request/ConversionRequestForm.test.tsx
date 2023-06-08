import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import ConversionRequestForm from './ConversionRequestForm';

const originalSelectText = "Original file type";
const convertedSelectText = "Converted file type";

it('renders a conversion request form', () => {
  const component = create(
    <ConversionRequestForm/>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('allows for selection of file types', () => {
    const {queryByDisplayValue, getByDisplayValue } = render(
        <ConversionRequestForm/>
    );

    expect(queryByDisplayValue(originalSelectText)).toBeTruthy();
    expect(queryByDisplayValue(convertedSelectText)).toBeTruthy();

    // Cannot select a converted file type without an original designated
    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'png' }});
    expect(queryByDisplayValue('png')).toBeFalsy();

    // Select jpg in the first select
    fireEvent.change(getByDisplayValue(originalSelectText), { target: { value: 'jpg'}});

    expect(queryByDisplayValue('jpeg/jpg')).toBeTruthy();

    // Select png in the second select
    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'png' }});

    expect(queryByDisplayValue('png')).toBeTruthy();

    // Select png in the first select, expect empty in second select
    fireEvent.change(getByDisplayValue('jpeg/jpg'), { target: { value: 'png'}});

    expect(queryByDisplayValue(convertedSelectText)).toBeTruthy();

    // Can now select jpg in the second select, as it is a valid conversion for jpg

    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'jpg'}});

    expect(queryByDisplayValue('jpeg/jpg')).toBeTruthy();
});

it('empties files on file type change', () => {
  const newFile = new File(['hello'], 'hello.jpg', {type: 'image/jpg'})

  const {queryByText, getByDisplayValue } = render(
    <ConversionRequestForm/>
  );

  // Select jpg in the first select
  fireEvent.change(getByDisplayValue(originalSelectText), { target: { value: 'jpg'}});

  // Find file input, doesn't seem possible with react testing library with this 3rd party component
  const fileInputQuery = document.querySelector("input");
  expect(fileInputQuery).toBeTruthy();
  const fileInput = fileInputQuery as HTMLInputElement;

  fireEvent.change(fileInput, { target: { files: [newFile] }});
  expect(queryByText(newFile.name)).toBeTruthy();
  
  // Change original file type
  fireEvent.change(getByDisplayValue('jpeg/jpg'), { target: { value: 'png'}});

  expect(queryByText(newFile.name)).toBeFalsy();
});
