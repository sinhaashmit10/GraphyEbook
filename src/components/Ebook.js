import React from 'react';
import EbookDisplay from './EbookDisplay';

export default function Ebook() {
  // Get ebookContent from the route state
  const ebookContent = window.history.state?.state?.ebookContent || '';
  console.log('ebookContent:', ebookContent);

  return (
    <EbookDisplay ebookContent={ebookContent} />
  );
}
