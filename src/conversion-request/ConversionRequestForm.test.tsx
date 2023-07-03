import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ConversionRequestForm from './ConversionRequestForm';
import { MemoryRouter } from 'react-router-dom';
import * as APIHelper from '../aws/APIHelper';
import * as S3Helper from '../aws/S3Helper';

const apiSpy = jest.spyOn(APIHelper, 'createSession');
const s3Spy = jest.spyOn(S3Helper, 'putS3Object');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders a conversion request form', () => {
  const component = create(
    <MemoryRouter>
      <ConversionRequestForm/>
    </MemoryRouter>
    
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('empties files on file type change', () => {
  const component = <MemoryRouter>
    <ConversionRequestForm/>
  </MemoryRouter>;
  const newFile = new File(['hello'], 'hello.jpg', {type: 'image/jpg'})

  const {queryByText, getByDisplayValue } = render(component);

  // Select jpg in the first select
  fireEvent.change(getByDisplayValue("Original file type"), { target: { value: 'jpg'}});

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

it('calls API on upload click', async () => {
  apiSpy.mockResolvedValue({
    sessionId: "Session Id",
    fileNameToId: {
      "hello.jpg": "File Id"
    }
});
  const newFile = new File(['hello'], 'hello.jpg', {type: 'image/jpg'})

  const component = <MemoryRouter>
    <ConversionRequestForm/>
  </MemoryRouter>;

  const {getByRole, queryByRole, getByDisplayValue, findByText } = render(component);

  // Select types
  fireEvent.change(getByDisplayValue("Original file type"), { target: { value: 'jpg'}});
  fireEvent.change(getByDisplayValue("Converted file type"), { target: { value: 'png'}});

  // Find file input, doesn't seem possible with react testing library with this 3rd party component
  const fileInputQuery = document.querySelector("input");
  expect(fileInputQuery).toBeTruthy();
  const fileInput = fileInputQuery as HTMLInputElement;

  fireEvent.change(fileInput, { target: { files: [newFile] }});

  const uploadButtonTextOption = { name: "Upload" };
  expect(queryByRole("button", uploadButtonTextOption)).toBeTruthy();

  const uploadButton = getByRole("button", uploadButtonTextOption);
  fireEvent.click(uploadButton);

  await waitFor(async () => expect(apiSpy).toHaveBeenCalledWith({
    conversionRequests: [
      {
        fileName: "hello.jpg",
        originalFileFormat: "jpg",
        convertedFileFormat: "png"
      }
    ]
  }));
  await waitFor(async () => expect(s3Spy).toHaveBeenCalledWith("File Id.jpg", "png", newFile));

  expect(mockedUsedNavigate).toHaveBeenCalledWith("/Session Id");
});
