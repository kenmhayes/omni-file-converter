import React from 'react';
import { ListGroup } from 'react-bootstrap';
import icons from '../assets/svg/bootstrap-icons.svg';

export interface FileListProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

interface FileListItemProps {
  fileName: string;
  onDelete: () => void;
}

function FileListItem(props: FileListItemProps) {
  const { fileName, onDelete } = props;

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4">
          {fileName}
        </div>
        <div className="col">
          <button type="button" aria-label="remove-file" className="btn" title="Remove File" onClick={onDelete}>
            <svg className="bi" width="32" height="32" fill="currentColor">
              <use xlinkHref={`${icons}#x-circle`} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
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
      <h6>Uploaded files:</h6>
      <ListGroup variant="flush">
        {files.map(
          (file: File, index: number) => (
            <ListGroup.Item className="list-group-item" key={`${file.name}_index`}>
              <FileListItem
                fileName={file.name}
                onDelete={() => onItemDelete(index)}
              />
            </ListGroup.Item>
          ),
        )}
      </ListGroup>

    </div>
  );
}

export default FileList;
