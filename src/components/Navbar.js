import React from 'react'; // Import your SignUpModal component here

export default function Navbar() {

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="graphylogo2.svg" alt="" className="graphyNavbarLogo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ms-auto">
              <button className="btn btn-outline-success me-2" type="button">
                Sign In
              </button>
              <button
                className="btn btn-outline-primary"
                type="button" // Open the Sign Up modal
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}