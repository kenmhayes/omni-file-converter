import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Select, { SelectOption } from './Select';
import {
  FILE_TYPE_CONVERSION_MAP, FileType, DEFAULT_FILE_TYPE, FileTypeConversionMetadata,
} from '../constants/FileTypes';
import FileUpload from './FileUpload';
import { putS3Object } from '../aws/S3Helper';

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
    files.forEach(async (file: File) => {
      await putS3Object(file.name, file);
    });
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
      <Select
        options={originalFileTypeSelectOptions}
        onSelectionChange={originalTypeSelectionHandler}
        placeholderText="Original file type"
      />
      <div>{originalType.displayValue}</div>
      <Select
        options={convertTypeSelectOptions}
        onSelectionChange={convertTypeSelectionHandler}
        placeholderText="Converted file type"
      />
      <div>{convertType.displayValue}</div>
      <FileUpload fileTypes={originalType.extensions} files={files} setFiles={setFiles} />
      <Button onClick={onUploadClick}>Upload</Button>
    </div>
  );
}

export default ConversionRequestForm;
