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
    <div className="container">
      <div className="row pb-4">
        <FileUploader
          disabled={disabled}
          handleChange={handleChange}
          name="file"
          files={files}
          types={fileTypes}
        />
      </div>
      <div className="row">
        <FileList files={files} setFiles={setFiles} />
      </div>
    </div>
  );
}

FileUpload.defaultProps = {
  disabled: false,
};

export default FileUpload;
