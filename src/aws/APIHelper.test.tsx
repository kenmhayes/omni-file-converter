import { createSession, CreateSessionRequest, FileConversionInput, getSession, GetSessionResponse } from "./APIHelper";
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
        const response = { 
            sessionId: "testSessionId",
            fileNameToId: {
                "test1.jpg": "123",
            }
        };
        mockedAPI.post.mockResolvedValue(response);
    
        const resultResponse = await createSession(createSessionInput);
        expect(resultResponse).toBe(response);
        expect(mockedAPI.post).toHaveBeenCalledWith('SessionGatewayAPI', '/createsession', { body: createSessionInput });
    });
});

describe('getSession', () => {
    it('gets a session', async () => {
        const sessionId = "12345";
        const response: GetSessionResponse = {
            expirationTime: 99999,
            conversions: [
                { 
                    id: "123",
                    fileName: "test1.jpg", 
                    conversionStatus: 'Done',
                    originalFileFormat: 'jpg',
                    convertedFileFormat: 'png'
                },
            ],
        };
        mockedAPI.get.mockResolvedValue(response);
        
        const resultResponse = await getSession(sessionId);
        expect(resultResponse).toBe(response);
        expect(mockedAPI.get).toHaveBeenCalledWith('SessionGatewayAPI', '/getsession', { queryStringParameters: {
            sessionid: sessionId,
        }});
    });
});
