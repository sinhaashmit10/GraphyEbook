import React from 'react';

export default function EbookDisplay({ content }) {
  return (
    <div className='card-side2'>
      {/* <h2 className='ebookdisplay-header'>Generated Ebook</h2> */}
      <div className="ebook-content">
        {/* Display the generated ebook content */}
        <p>{content}</p>
        <h5 className='logo-display'>GRAPHY</h5>
      </div>
    </div>
  );
}
