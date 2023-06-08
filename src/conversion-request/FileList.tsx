import React from 'react';
import FileListItem from './FileListItem';

export interface FileListProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

function FileList(props: FileListProps) {
  const { files, setFiles } = props;

  const onItemDelete = (index: number) => {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    setFiles(filesCopy);
  };

  return (
    <div className="container">
      {files.map(
        (file: File, index: number) => (
          <FileListItem
            key={`${file.name}_index`}
            fileName={file.name}
            onDelete={() => onItemDelete(index)}
          />
        ),
      )}
    </div>
  );
}

export default FileList;
