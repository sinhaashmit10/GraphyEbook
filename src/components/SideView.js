import React from 'react';

export default function SideView({ enterTitle }) { 
  return (
    <>
    <div id='sideViewContainer' className="card-side">
     
      <img
        id="coverImage"
        src="Frame 1116609780.svg"
        className="card-img-top"
        alt=""
      />
      <h1 className="enterTitle">{enterTitle}</h1> 
      <div className='sideViewBottom'>
        <p className="bytext">By: Author Name</p>
        <img src="graphylogo2.svg" alt="" id='graphyLogoSideView'/>
      </div>
    </div>
    </>
  );
}