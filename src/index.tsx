import React from 'react';
import './assets/scss/main.scss';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AmplifySetup from './aws/AmplifySetup';
import ROUTER from './constants/Routes';

// Setup AWS here
AmplifySetup();

/**
 * Starting point of the react app with routing support
 */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>,
);
