import { Storage } from 'aws-amplify';

export const getS3ObjectUrl = async (objectKey: string): Promise<string> => Storage.get(
  `${process.env.REACT_APP_S3_CONVERTED_PREFIX}${objectKey}`,
);

export const putS3Object = async (
  objectKey: string,
  convertType: string,
  file: File,
): Promise<void> => {
  await Storage.put(`${process.env.REACT_APP_S3_ORIGINAL_PREFIX}${convertType}/${objectKey}`, file);
};
