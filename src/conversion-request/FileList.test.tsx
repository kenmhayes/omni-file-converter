import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import FileList from './FileList';

it('renders a file list', () => {
  const files: File[] = [
    { name: "File 1" } as File, { name: "File 2" } as File, { name: "File 3"} as File
  ];
  const component = <FileList files={files} setFiles={jest.fn()}/>;

  expect(create(component).toJSON()).toMatchSnapshot();
});


it('update file from the list when the delete button is pressed', () => {
  const files: File[] = [
    { name: "File 1" } as File, { name: "File 2" } as File, { name: "File 3"} as File
  ];

  const setFileHandler = jest.fn();

  const { queryAllByRole, getAllByRole } = render(
    <FileList files={files} setFiles={setFileHandler}/>
  );

  const deleteButtonRole = "button";
  expect(queryAllByRole(deleteButtonRole)).toBeTruthy();
  let deleteButtons = queryAllByRole(deleteButtonRole);

  // Delete second element
  fireEvent.click(deleteButtons[1]);

  expect(setFileHandler).toHaveBeenCalledWith([files[0], files[2]]);

  // Delete first element
  deleteButtons = getAllByRole(deleteButtonRole);
  fireEvent.click(deleteButtons[0]);

  expect(setFileHandler).toHaveBeenCalledWith([files[1], files[2]]);
});

