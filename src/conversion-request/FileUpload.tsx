import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import FileList from './FileList';

export interface FileUploadProps {
  disabled?: boolean;
  fileTypes: string[];
  files: File[];
  setFiles: (files: File[]) => void;
}

function FileUpload(props: FileUploadProps) {
  const {
    fileTypes, files, setFiles, disabled,
  } = props;

  const handleChange = (file: File) => {
    const newFiles = [...files];
    newFiles.push(file);
    setFiles(newFiles);
  };

  return (
    <div>
      <FileUploader
        disabled={disabled}
        handleChange={handleChange}
        name="file"
        files={files}
        types={fileTypes}
      />
      <FileList files={files} setFiles={setFiles} />
    </div>
  );
}

FileUpload.defaultProps = {
  disabled: false,
};

export default FileUpload;
