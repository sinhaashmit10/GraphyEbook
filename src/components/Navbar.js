import React from 'react'

export default function Navbar (){
    return(
<div className="app-container">
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      {/* <img className="group" src="Group.png" alt="" /> */}
      <h5>GRAPHY</h5>
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
        {/* Sign-in button */}
        <button className="btn btn-outline-success me-2" type="button">
          Sign In
        </button>
        {/* Sign-up button */}
        <button className="btn btn-outline-primary" type="button">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</nav>
</div>
    )
}

