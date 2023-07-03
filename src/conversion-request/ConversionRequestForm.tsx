import React, {
  useState, useEffect, ReactElement, PropsWithChildren,
} from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FileType, DEFAULT_FILE_TYPE } from '../constants/FileTypes';
import FileUpload from './FileUpload';
import { putS3Object } from '../aws/S3Helper';
import { CreateSessionRequest, FileConversionInput, createSession } from '../aws/APIHelper';
import FileTypeSelect from './FileTypeSelect';

interface SectionCardProps {
  headerText: string;
}

function SectionCard(props: PropsWithChildren<SectionCardProps>): ReactElement {
  const { headerText, children } = props;
  return (
    <Card className="mt-4">
      <Card.Header>
        <h4>{headerText}</h4>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}

/**
 * Form for creating a conversion request, such as indicating file types and files to upload
 * @returns
 *   a react element
 */
function ConversionRequestForm() {
  const navigate = useNavigate();
  const [originalType, setOriginalType] = useState<FileType>(DEFAULT_FILE_TYPE);
  const [convertType, setConvertType] = useState<FileType>(DEFAULT_FILE_TYPE);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onUploadClick = async () => {
    setIsUploading(true);

    const createSessionRequest: CreateSessionRequest = {
      conversionRequests: files.map(
        (file: File): FileConversionInput => (
          {
            fileName: file.name,
            originalFileFormat: originalType.key,
            convertedFileFormat: convertType.key,
          }
        ),
      ),
    };

    const response = await createSession(createSessionRequest);

    files.forEach(async (file: File) => {
      const key = `${response.fileNameToId[file.name]}.${originalType.key}`;
      await putS3Object(key, convertType.key, file);
    });

    navigate(`/${response.sessionId}`);
  };

  useEffect(() => {
    setFiles([]);
  }, [originalType]);

  return (
    <div>
      <SectionCard headerText="Step #1: Choose file formats">
        <FileTypeSelect
          onOriginalTypeChange={setOriginalType}
          onConvertTypeChange={setConvertType}
        />
      </SectionCard>
      <SectionCard headerText="Step #2: Choose files">
        <FileUpload fileTypes={originalType.extensions} files={files} setFiles={setFiles} />
      </SectionCard>
      <SectionCard headerText="Step #3: Upload your files">
        {
          isUploading
            ? (
              <Button disabled>
                <Spinner size="sm" />
                <span className="ps-1">Uploading...</span>
              </Button>
            )
            : <Button variant="primary" onClick={onUploadClick}>Upload</Button>
        }
      </SectionCard>
    </div>
  );
}

export default ConversionRequestForm;
