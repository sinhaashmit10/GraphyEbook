import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EbookDisplay({ ebookContent, selectedAudience, selectedPages, subject, keyTopics }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const regenerateEbookContent = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Generate a ${selectedPages}-page ebook with the title "Introduction to ${subject}" covering key topics: ${keyTopics} for a ${selectedAudience}.`,
          max_tokens: 1000, // Adjust as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);

        const ebookContent = data.choices[0].text;

        navigate('/Ebook', { state: { ebookContent } });
      } else {
        throw new Error('Failed to regenerate ebook content');
      }
    } catch (error) {
      console.error('Error regenerating ebook content:', error);
      alert('Failed to regenerate the ebook content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <p>{ebookContent}</p>
      </div>
      <h5 className='logo-display'>GRAPHY</h5>
      <div className='regen-ebook'>
        <button className="btn btn-light mx-1" onClick={regenerateEbookContent} disabled={isLoading}>
          {isLoading ? "Regenerating..." : <><img src="redoblack.png" width="15" alt='' /> Regenerate</>}
        </button>
        <button className='btn btn-light mx-1'>
          <img src="./download.png" alt="" /> Download PDF
        </button>
        <button id='publish-button' className='btn btn-light mx-1'>
          <img src="./star.png" alt="" /> Publish ebook
        </button>
      </div>
    </div>
  );
}
