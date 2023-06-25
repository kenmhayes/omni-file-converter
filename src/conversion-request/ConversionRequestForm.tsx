import React, {
  useState, useEffect, ReactElement, PropsWithChildren,
} from 'react';
import { Button, Card } from 'react-bootstrap';
import Select, { SelectOption } from './Select';
import {
  FILE_TYPE_CONVERSION_MAP, FileType, DEFAULT_FILE_TYPE, FileTypeConversionMetadata,
} from '../constants/FileTypes';
import FileUpload from './FileUpload';
// import { putS3Object } from '../aws/S3Helper';
import { CreateSessionRequest, FileConversionInput, createSession } from '../aws/APIHelper';

interface SectionCardProps {
  headerText: string;
}

function createSelectOptionFromFileType(fileType: FileType): SelectOption {
  return { id: fileType.key, displayValue: fileType.displayValue };
}

function getFileTypeFromMap(fileTypeKey: string): FileType {
  const metadata: FileTypeConversionMetadata = FILE_TYPE_CONVERSION_MAP[fileTypeKey];
  if (metadata) {
    return metadata.fileType;
  }
  return DEFAULT_FILE_TYPE;
}

function SectionCard(props: PropsWithChildren<SectionCardProps>): ReactElement {
  const { headerText, children } = props;
  return (
    <Card className="mt-4">
      <Card.Header>
        <h3>{headerText}</h3>
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
  const [originalType, setOriginalType] = useState<FileType>(DEFAULT_FILE_TYPE);
  const [convertType, setConvertType] = useState<FileType>(DEFAULT_FILE_TYPE);
  const [convertTypeSelectOptions, setConvertTypeSelectOptions] = useState<SelectOption[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const originalFileTypeSelectOptions: SelectOption[] = Object.keys(FILE_TYPE_CONVERSION_MAP)
    .map((fileTypeKey: string) => createSelectOptionFromFileType(getFileTypeFromMap(fileTypeKey)));

  const originalTypeSelectionHandler = (selectedFileType: string) => {
    setOriginalType(getFileTypeFromMap(selectedFileType));
  };
  const convertTypeSelectionHandler = (selectedFileType: string) => {
    setConvertType(getFileTypeFromMap(selectedFileType));
  };

  const onUploadClick = async () => {
    // Temp code, so untested
    /*
    files.forEach(async (file: File) => {
      await putS3Object(file.name, convertType.key, file);
    });
*/
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

    await createSession(createSessionRequest);
  };

  useEffect(() => {
    setConvertType(DEFAULT_FILE_TYPE);
    setFiles([]);

    if (originalType.key !== DEFAULT_FILE_TYPE.key) {
      const conversionData: FileTypeConversionMetadata = FILE_TYPE_CONVERSION_MAP[originalType.key];
      setConvertTypeSelectOptions(
        conversionData.supportedConversionTypeKeys.map(
          (key: string) => createSelectOptionFromFileType(getFileTypeFromMap(key)),
        ),
      );
    } else {
      setConvertTypeSelectOptions([]);
    }
  }, [originalType]);

  return (
    <div>
      <SectionCard headerText="Step #1: Choose file formats">
        <div className="container">
          <div className="row pb-4">
            <Select
              className="col-3"
              options={originalFileTypeSelectOptions}
              onSelectionChange={originalTypeSelectionHandler}
              placeholderText="Original file type"
            />
          </div>
          <div className="row">
            <Select
              className="col-3"
              options={convertTypeSelectOptions}
              onSelectionChange={convertTypeSelectionHandler}
              placeholderText="Converted file type"
            />
          </div>
        </div>
      </SectionCard>
      <SectionCard headerText="Step #2: Choose files">
        <FileUpload fileTypes={originalType.extensions} files={files} setFiles={setFiles} />
      </SectionCard>
      <SectionCard headerText="Step #3: Upload your files">
        <Button variant="primary" onClick={onUploadClick}>Upload</Button>
      </SectionCard>
    </div>
  );
}

export default ConversionRequestForm;
