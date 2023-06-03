import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

/**
 * An element providing navigation bar features, to be displayed at the top of a webpage
 * @returns
 *   a react element
 */
function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Omni</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Convert</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="myfiles">My Files</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
