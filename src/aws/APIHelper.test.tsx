import { createSession, CreateSessionRequest, FileConversionInput } from "./APIHelper";
import { API } from "aws-amplify";

jest.mock('aws-amplify');

const mockedAPI = jest.mocked(API, true);

describe('createSession', () => {
    const conversionRequests: FileConversionInput[] = [
        {
            fileName: 'test1.jpg', originalFileFormat: 'jpg', convertedFileFormat: 'png'
        },
        {
            fileName: 'test2.jpg', originalFileFormat: 'jpg', convertedFileFormat: 'png'
        },
    ];

    const createSessionInput: CreateSessionRequest = {
        conversionRequests: conversionRequests
    };

    it('creates a session and returns session id', async () => {
        const response = { sessionId: "testSessionId" };
        mockedAPI.post.mockResolvedValue(response);
    
        const resultResponse = await createSession(createSessionInput);
        expect(resultResponse).toBe(response.sessionId);
        expect(mockedAPI.post).toHaveBeenCalledWith('CreateSessionGatewayAPI', '/createsession', { body: createSessionInput });
    });
});
