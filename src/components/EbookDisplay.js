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
      {/* Display the generated ebook content */}
      <p>{ebookContent}</p>
      <h5 className='logo-display'>GRAPHY</h5>
    </div>
  );
}
