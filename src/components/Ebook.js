// Ebook.js
import React from 'react';
import EbookDisplay from './EbookDisplay';
import { useLocation } from 'react-router-dom';

export default function Ebook() {
  // Get ebookContent from the route state
  const location = useLocation();
  const ebookContent = location.state?.ebookContent || '';

  return (
    <EbookDisplay ebookContent={ebookContent} />
  );
}