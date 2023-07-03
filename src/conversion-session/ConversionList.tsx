import React, { useState } from 'react';
import {
  Anchor, Button, Card, Table,
} from 'react-bootstrap';
import { ConversionOutput } from '../aws/APIHelper';
import { getS3ObjectUrl } from '../aws/S3Helper';
import READABLE_CONVERSION_STATUSES from '../constants/ConversionStatuses';

export interface ConversionListProps {
  conversions: ConversionOutput[];
}

interface ConversionListItemProps {
  conversion: ConversionOutput;
}

function ConversionListItem(props: ConversionListItemProps) {
  const { conversion } = props;
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const onButtonClick = async () => {
    const objectKey = `${conversion.id}.${conversion.convertedFileFormat}`;

    const objectDownloadUrl = await getS3ObjectUrl(objectKey);
    setDownloadUrl(objectDownloadUrl);
  };

  return (
    <tr>
      <td>{conversion.fileName}</td>
      <td>{conversion.convertedFileFormat}</td>
      <td>{READABLE_CONVERSION_STATUSES[conversion.conversionStatus]}</td>
      <td>
        {
            downloadUrl !== ''
              ? <Anchor href={downloadUrl}>Download</Anchor>
              : <Button onClick={onButtonClick}>Get Download Link</Button>
        }
      </td>
    </tr>
  );
}

function ConversionList(props: ConversionListProps) {
  const { conversions } = props;

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h4>Your converted files:</h4>
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Converted File Type</th>
                <th>Status</th>
                <th>Download Link</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map((conversion: ConversionOutput) => (
                <ConversionListItem conversion={conversion} key={conversion.id} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ConversionList;
