import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import FileListItem from './FileListItem';

it('renders a file list item', () => {
  const component = create(
    <FileListItem fileName="File" onDelete={jest.fn()}/>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls the delete handler when the delete icon is pressed', () => {
    const deleteHandler = jest.fn();

    const {queryByRole, getByRole } = render(
        <FileListItem fileName="File" onDelete={deleteHandler}/>
    );

    const deleteButtonRole = "button";
    const deleteButtonOptions = { name: /remove-file/i };
    expect(queryByRole(deleteButtonRole, deleteButtonOptions)).toBeTruthy();

    fireEvent.click(getByRole(deleteButtonRole, deleteButtonOptions));

    expect(deleteHandler).toHaveBeenCalled();
});

