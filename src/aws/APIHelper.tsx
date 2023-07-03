import { API } from 'aws-amplify';

const SESSION_API_NAME = 'SessionGatewayAPI';

export interface CreateSessionRequest {
  conversionRequests: FileConversionInput[];
}

export interface FileConversionInput {
  fileName: string;
  originalFileFormat: string;
  convertedFileFormat: string;
}

interface CreateSessionResponse {
  sessionId: string;
  fileNameToId: { [key: string]: string };
}

export interface GetSessionResponse {
  expirationTime: number;
  conversions: ConversionOutput[];
}

export interface ConversionOutput {
  id: string;
  fileName: string;
  conversionStatus: string;
  originalFileFormat: string;
  convertedFileFormat: string;
}

// eslint-disable-next-line max-len
export const createSession = async (request: CreateSessionRequest): Promise<CreateSessionResponse> => API.post(
  SESSION_API_NAME,
  '/createsession',
  {
    body: request,
  },
);

export const getSession = async (sessionId: string): Promise<GetSessionResponse> => API.get(
  SESSION_API_NAME,
  '/getsession',
  {
    queryStringParameters: {
      sessionid: sessionId,
    },
  },
);
