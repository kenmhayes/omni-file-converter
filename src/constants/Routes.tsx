import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../app/App';
import ErrorPage from '../app/ErrorPage';
import ConversionRequestForm from '../conversion-request/ConversionRequestForm';

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
        path: 'myfiles/',
        element: <div>My files</div>,
      },
    ],
  },
]);

export default ROUTER;
