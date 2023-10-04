import React from 'react';

export default function EbookDisplay({ ebookContent }) {
  console.log('Ebook Content:', ebookContent); // Check if ebookContent is received

  if (!ebookContent) {
    return (
      <div className='card-side2'>
        <p>No ebook content available.</p>
      </div>
    );
  }

  return (
    <div className='card-side2'>
      <div className="ebook-content" style={{ maxHeight: '550px', overflow: 'auto' }}>
        {/* Display the generated ebook content */}
        <p>{ebookContent}</p>
      </div>
      <h5 className='logo-display'>GRAPHY</h5>
    </div>
  );
}
