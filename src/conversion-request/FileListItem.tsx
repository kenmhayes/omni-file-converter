import React, { useState } from 'react';
import { Anchor, Button } from 'react-bootstrap';
import deleteicon from '../assets/svg/x-circle.svg';
import { getS3ObjectUrl } from '../aws/S3Helper';

export interface FileListItemProps {
  fileName: string;
  onDelete: () => void;
}

function FileListItem(props: FileListItemProps) {
  const { fileName, onDelete } = props;
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const onButtonClick = async () => {
    // Temp code, so left untested
    const objectDownloadUrl = await getS3ObjectUrl(fileName);
    setDownloadUrl(objectDownloadUrl);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {fileName}
        </div>
        <div className="col-3">
          <Button onClick={onButtonClick}>Get Download</Button>
          <Anchor href={downloadUrl} disabled={!downloadUrl}>Download</Anchor>
        </div>
        <div className="col">
          <button type="button" aria-label="remove-file" className="btn" title="Remove File" onClick={onDelete}>
            <img src={deleteicon} alt="Remove File" width="32" height="32" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileListItem;
