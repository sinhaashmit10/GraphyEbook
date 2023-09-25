import React from "react";

export default function SideView(props) {
  return (
    <>
    <div className="card-side">
      <img id="coverImage" style={{ maxWidth: '100%', maxHeight: '300px' }} src="Frame 1116609780.png" className="card-img-top" alt="..." />
      <h1 className="enterTitle">{props.title}</h1>
      <h8 className = "bytext">By: {props.author}</h8>
      {/* <img className="sideimage" src="Group.png" alt="" /> */}
      <h5 className= "sideh5">GRAPHY</h5>
    </div>
    </>
  );
}
