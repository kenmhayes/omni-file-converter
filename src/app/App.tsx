import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * Element containing the overall layout of the web site
 * @returns
 *   a react element
 */
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
