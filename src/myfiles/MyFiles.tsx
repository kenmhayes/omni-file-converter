import React, { ChangeEvent, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyFiles() {
  const navigate = useNavigate();
  const sessionId = useRef<string>('');

  const onSessionInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    sessionId.current = inputValue;
  };

  const onSessionButtonClick = (): void => {
    navigate(`/${sessionId.current}`);
  };

  return (
    <div className="container">
      <h3>Find your converted files</h3>
      <Form>
        <Form.Group className="mb-3" controlId="sessionId">
          <Form.Label>Session ID</Form.Label>
          <Form.Control type="text" onChange={onSessionInputChange} />
        </Form.Group>
        <Button type="button" variant="primary" onClick={onSessionButtonClick}>Submit</Button>
      </Form>
    </div>
  );
}

export default MyFiles;
