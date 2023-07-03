import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../app/App';
import ErrorPage from '../app/ErrorPage';
import ConversionRequestForm from '../conversion-request/ConversionRequestForm';
import ConversionSession from '../conversion-session/ConversionSession';
import MyFiles from '../myfiles/MyFiles';

/**
 * React Router object for the app, to be provided to a router provider
 */

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ConversionRequestForm />,
      },
      {
        path: '/:sessionId',
        element: <ConversionSession />,
      },
      {
        path: 'myfiles/',
        element: <MyFiles />,
      },
    ],
  },
]);

export default ROUTER;
