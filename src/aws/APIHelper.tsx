import { API } from 'aws-amplify';

export interface CreateSessionRequest {
  conversionRequests: FileConversionInput[];
}

export interface FileConversionInput {
  fileName: string;
  originalFileFormat: string;
  convertedFileFormat: string;
}

interface CreateSessionResponseBody {
  sessionId: string;
}

export const createSession = async (request: CreateSessionRequest): Promise<string> => {
  const response: CreateSessionResponseBody = await API.post('CreateSessionGatewayAPI', '/createsession', {
    body: request,
  });
  return response.sessionId;
};

export const derp: string = 'derp';
