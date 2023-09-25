import React from 'react';

export default function SideView() {
  return (
    <div className="card-side">
     
      <img
        id="coverImage"
        style={{ maxWidth: '100%', maxHeight: '300px' }}
        src="Frame 1116609780.png"
        className="card-img-top"
        alt=""
      />
      <h1 className="enterTitle">E-Book Title</h1>
      <h8 className="bytext">By: Author Name</h8>
      <h5 className="sideh5">GRAPHY</h5>
    </div>
  );
}
