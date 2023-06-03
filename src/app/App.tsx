import React from 'react';
import './App.scss';
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
      <div className="container">
        <Header />
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
