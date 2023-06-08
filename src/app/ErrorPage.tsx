import React from 'react';
import './ErrorPage.scss';
import { useRouteError } from 'react-router-dom';

/**
 * Interface for the route error object from react-router-dom package
 */
interface RouteError {
  statusText?: string;
  message?: string;
}

/**
 * An element for displaying a message indicating a route error occurred
 * @returns
 *   a react element
 */
function ErrorPage() {
  const error: RouteError = useRouteError() as RouteError;

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main className="px-3 mb-auto">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <i>{error.statusText}</i>
      </main>
    </div>
  );
}

export default ErrorPage;
