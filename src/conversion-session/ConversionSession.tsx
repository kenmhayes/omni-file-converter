import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { ConversionOutput, GetSessionResponse, getSession } from '../aws/APIHelper';
import ConversionList from './ConversionList';
import icons from '../assets/svg/bootstrap-icons.svg';

interface LoadedBodyProps {
  expirationTime: number;
  conversions: ConversionOutput[];
}

function PreloadBody() {
  return <Spinner animation="border" />;
}

function LoadedBody(props: LoadedBodyProps) {
  const { expirationTime, conversions } = props;

  const readableDate = new Date(expirationTime * 1000).toDateString();

  return (
    <div>
      <Alert variant="primary" className="d-flex align-items-center">
        <svg className="me-2" width="16" height="16" fill="currentColor">
          <use xlinkHref={`${icons}#info-circle`} />
        </svg>
        <div>
          Your converted files are available until
          {' '}
          <strong><em>{readableDate}</em></strong>
          . Save this link if you wish to download them at a later time.
        </div>

      </Alert>
      <ConversionList conversions={conversions} />
    </div>
  );
}

function ConversionSession() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<GetSessionResponse>();

  const fetchData = async (id: string) => {
    const response = await getSession(id);
    setSession(response);
  };

  useEffect(() => {
    fetchData(sessionId as string);
  }, [sessionId]);

  return (
    <div>
      {
        session
          ? <LoadedBody expirationTime={session.expirationTime} conversions={session.conversions} />
          : <PreloadBody />
      }
    </div>
  );
}

export default ConversionSession;
