import React, { useEffect, useState } from 'react';
import Select, { SelectOption } from './Select';
import {
  DEFAULT_FILE_TYPE, FILE_TYPE_CONVERSION_MAP, FileType, FileTypeConversionMetadata,
} from '../constants/FileTypes';

export interface FileTypeSelectProps {
  onOriginalTypeChange: (type: FileType) => void;
  onConvertTypeChange: (type: FileType) => void;
}

function getFileTypeFromMap(fileTypeKey: string): FileType {
  const metadata: FileTypeConversionMetadata = FILE_TYPE_CONVERSION_MAP[fileTypeKey];
  if (metadata) {
    return metadata.fileType;
  }
  return DEFAULT_FILE_TYPE;
}

function createSelectOptionFromFileType(fileType: FileType): SelectOption {
  return { id: fileType.key, displayValue: fileType.displayValue };
}

function FileTypeSelect(props: FileTypeSelectProps) {
  const [originalTypeOptions, setOriginalTypeOptions] = useState<SelectOption[]>([]);
  const { onOriginalTypeChange, onConvertTypeChange } = props;
  const [convertTypeSelectOptions, setConvertTypeSelectOptions] = useState<SelectOption[]>([]);

  const originalTypeSelectionHandler = (selectedFileType: string) => {
    const newType = getFileTypeFromMap(selectedFileType);
    const conversionData: FileTypeConversionMetadata = FILE_TYPE_CONVERSION_MAP[newType.key];
    setConvertTypeSelectOptions(
      conversionData.supportedConversionTypeKeys.map(
        (key: string) => createSelectOptionFromFileType(getFileTypeFromMap(key)),
      ),
    );

    onOriginalTypeChange(newType);
    onConvertTypeChange(DEFAULT_FILE_TYPE);
  };

  const convertTypeSelectionHandler = (selectedFileType: string) => {
    onConvertTypeChange(getFileTypeFromMap(selectedFileType));
  };

  useEffect(() => {
    const selectOptions: SelectOption[] = [];
    Object.keys(FILE_TYPE_CONVERSION_MAP)
      .forEach((fileTypeKey: string) => {
        if (fileTypeKey !== DEFAULT_FILE_TYPE.key) {
          selectOptions.push(createSelectOptionFromFileType(getFileTypeFromMap(fileTypeKey)));
        }
      });
    setOriginalTypeOptions(selectOptions);
  }, []);

  return (
    <div className="container">
      <div className="row pb-4">
        <Select
          className="col-3"
          options={originalTypeOptions}
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
  );
}

export default FileTypeSelect;
