import React from 'react';
import deleteicon from '../assets/svg/x-circle.svg';

export interface FileListItemProps {
  fileName: string;
  onDelete: () => void;
}

function FileListItem(props: FileListItemProps) {
  const { fileName, onDelete } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          {fileName}
        </div>
        <div className="col">
          <button type="button" className="btn" title="Remove File" onClick={onDelete}>
            <img src={deleteicon} alt="Remove File" width="32" height="32" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileListItem;
