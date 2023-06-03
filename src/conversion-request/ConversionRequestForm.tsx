import React, { useState, useEffect } from 'react';
import Select, { SelectOption } from './Select';
import {
  FILE_TYPE_CONVERSION_MAP, FileType, DEFAULT_FILE_TYPE, FileTypeConversionMetadata,
} from '../constants/FileTypes';

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

  const originalFileTypeSelectOptions: SelectOption[] = Object.keys(FILE_TYPE_CONVERSION_MAP)
    .map((fileTypeKey: string) => createSelectOptionFromFileType(getFileTypeFromMap(fileTypeKey)));

  const originalTypeSelectionHandler = (selectedFileType: string) => {
    setOriginalType(getFileTypeFromMap(selectedFileType));
  };
  const convertTypeSelectionHandler = (selectedFileType: string) => {
    setConvertType(getFileTypeFromMap(selectedFileType));
  };

  useEffect(() => {
    setConvertType(DEFAULT_FILE_TYPE);
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
      />
      <div>{originalType.displayValue}</div>
      <Select
        options={convertTypeSelectOptions}
        onSelectionChange={convertTypeSelectionHandler}
      />
      <div>{convertType.displayValue}</div>
    </div>
  );
}

export default ConversionRequestForm;
