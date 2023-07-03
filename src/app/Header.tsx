import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import omniLogo from '../assets/svg/omni-logo.svg';

/**
 * An element providing navigation bar features, to be displayed at the top of a webpage
 * @returns
 *   a react element
 */
function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="shadow-sm mb-3">
      <div className="container">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <svg width="32" height="32" fill="currentColor">
            <use xlinkHref={`${omniLogo}#omni-logo`} />
          </svg>
          <span>Omni Converter</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/" className="btn btn-outline-light">
            Convert
          </Nav.Link>
          <Nav.Link href="myfiles">
            My Files
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
