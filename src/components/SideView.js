import React from 'react';

export default function SideView({ enterTitle }) { // Accept enterTitle as a prop
  return (
    <>
    <div className="card-side">
     
      <img
        id="coverImage"
        // style={{ maxWidth: '100%', maxHeight: '300px', minHeight:'300px' }}
        src="Frame 1116609780.svg"
        className="card-img-top"
        alt=""
      />
      <h1 className="enterTitle">{enterTitle}</h1> {/* Use the enterTitle prop */}
      <div className='sideViewBottom'>
        <p className="bytext">By: Author Name</p>
        <img src="graphylogo2.svg" alt="" id='graphyLogoSideView'/>
      </div>
    </div>
    </>
  );
}