import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import FileUpload from './FileUpload';

it('renders a file list', () => {
  const files: File[] = [
    { name: "File 1" } as File, { name: "File 2" } as File, { name: "File 3"} as File
  ];
  const fileTypes = [ "png" ];
  const component = <FileUpload files={files} setFiles={jest.fn()} fileTypes={fileTypes} />;

  expect(create(component).toJSON()).toMatchSnapshot();
});

it('changes file list on upload and removal', async () => {
    const setFiles = jest.fn();
    const files: File[] = [
        { name: "File 1" } as File, { name: "File 2" } as File, { name: "File 3"} as File
      ];
    const fileTypes = [ "png" ];
    const newFile = new File(['hello'], 'hello.png', {type: 'image/png'})

    const component = <FileUpload files={files} setFiles={setFiles} fileTypes={fileTypes} />;
    render(component);

    // Find file input, doesn't seem possible with react testing library with this 3rd party component
    const fileInputQuery = document.querySelector("input");
    expect(fileInputQuery).toBeTruthy();
    const fileInput = fileInputQuery as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [newFile] }});

    expect(setFiles).toHaveBeenCalledWith([...files, newFile]);
});
