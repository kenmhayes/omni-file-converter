import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import ErrorPage from './app/ErrorPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

/**
 * Starting point of the react app with routing support 
 */


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <div>Converter</div>,
      },
      {
        path: "myfiles/",
        element: <div>My files</div>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
