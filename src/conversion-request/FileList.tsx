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
      <h5>Uploaded files:</h5>
      <ul className="list-group list-group-flush">
        {files.map(
          (file: File, index: number) => (
            <li className="list-group-item" key={`${file.name}_index`}>
              <FileListItem
                fileName={file.name}
                onDelete={() => onItemDelete(index)}
              />
            </li>
          ),
        )}
      </ul>

    </div>
  );
}

export default FileList;
