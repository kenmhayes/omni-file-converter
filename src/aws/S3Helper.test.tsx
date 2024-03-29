import { getS3ObjectUrl, putS3Object } from "./S3Helper";
import { Storage } from "aws-amplify";

jest.mock('aws-amplify');

const mockedStorage = jest.mocked(Storage, true);

describe('getS3ObjectUrl', () => {
    const key = 'objectKey';

    it('gets a S3 object Url', async () => {
        const url = 'test.com';
        mockedStorage.get.mockResolvedValue(url);
    
        const resultUrl = await getS3ObjectUrl(key);
        expect(resultUrl).toBe(url);
        expect(mockedStorage.get).toHaveBeenCalledWith(`${process.env.REACT_APP_S3_CONVERTED_PREFIX}${key}`);
    });
});

describe('putS3Object', () => {
    it('uploads to a S3 bucket', async () => {
        const key = 'objectKey';
        const convertType = 'png';
        const file = { name: 'TestFile', size: 1024 } as File;
    
        await putS3Object(key, convertType, file);
    
        expect(mockedStorage.put).toHaveBeenCalledWith(`${process.env.REACT_APP_S3_ORIGINAL_PREFIX}${convertType}/${key}`, file);
    });
});
