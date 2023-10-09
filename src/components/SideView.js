import React from 'react';

export default function SideView({ enterTitle }) { // Accept enterTitle as a prop
  return (
    <>
    <div className="card-side">
     
      <img
        id="coverImage"
        style={{ maxWidth: '100%', maxHeight: '300px' }}
        src="Frame 1116609780.png"
        className="card-img-top"
        alt=""
      />
      <h1 className="enterTitle">{enterTitle}</h1> {/* Use the enterTitle prop */}
      <div>
        <p className="bytext">By: Author Name</p>
        <h5 className="sideh5">GRAPHY</h5>
      </div>
    </div>
    </>
  );
}