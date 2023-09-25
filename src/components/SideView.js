import React from 'react';

export default function SideView() {
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
      <h1 className="enterTitle">E-Book <br />Title</h1>
      <div>
        <p className="bytext">By: Author Name</p>
        <h5 className="sideh5">GRAPHY</h5>
    </div>
    </div>
    </>
  );
}
