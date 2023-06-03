/**
 * Contains metadata for the various file types supported by the app
 * including which conversions are allowed for a given type
 */

/**
 * Metadata for a single file type
 */
export interface FileType {
  // Unique identifier
  key: string;

  // Supported file type extensions, as several of them relate to the same thing (i.e. jpg/jpeg)
  extensions: string[];

  // A user-friendly value for display on the website
  displayValue: string;
}

/**
 * Indicates which conversions are supported for a file type
 */
export interface FileTypeConversionMetadata {
  // Metadata on the source file type
  fileType: FileType;

  // FileType keys for the types the source can be converted into
  supportedConversionTypeKeys: string[];
}

const jpeg: FileType = { key: 'jpg', extensions: ['jpg', 'jpeg'], displayValue: 'jpeg/jpg' };

const png: FileType = { key: 'png', extensions: ['png'], displayValue: 'png' };

export const DEFAULT_FILE_TYPE = { key: '', extensions: [], displayValue: '' };

export const FILE_TYPE_CONVERSION_MAP: { [fileTypeKey: string]: FileTypeConversionMetadata } = {
  [jpeg.key]: {
    fileType: jpeg,
    supportedConversionTypeKeys: [png.key],
  },
  [png.key]: {
    fileType: png,
    supportedConversionTypeKeys: [jpeg.key],
  },
};
