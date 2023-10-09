// EbookDisplay.js:
// EbookDisplay.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function EbookDisplay() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [ebookContent, setEbookContent] = useState('');
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const { selectedAudience, selectedPages, subject, keyTopics } = location.state;

  useEffect(() => {
    generateEbookContent();
    // eslint-disable-next-line
  }, []); // Fetch content on component mount

  const generateEbookContent = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Generate a ${selectedPages}-page ebook with the title "Introduction to ${subject}" covering key topics: ${keyTopics} for a ${selectedAudience}.
          Make a proper list of contents with the names of the chapter with their respective page numbers. Divide the ebook pages properly and use 
          bold headings for every chapter. Feel free to use tables, datas, research reference etc. Write professional content as I will directly use
          the generated content in my Ebook. According to the number of pages, every page must contain atleast 100 words.`,
          max_tokens: 1000, // Adjust as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        // console.log(data.choices);
        const newEbookContent = data.choices[0].text;
        // console.log(newEbookContent,">>>>>");
        if(!newEbookContent)
        setEbookContent("not-found");
        else
        setEbookContent(newEbookContent);
      } else {
        throw new Error('Failed to generate ebook content');
      }
    } catch (error) {
      console.error('Error generating ebook content:', error);
      alert('Failed to generate the ebook content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateEbookContent = () => {
    generateEbookContent();
  };

  if (!ebookContent) {
    return (
      <div className='card-side2'>
        <p className='loadingText'>Loading...</p>
      </div>
    );
  }

  if (ebookContent==="not-found") {
    return (
      <div className='card-side2'>
        <p>Ebook content not found.</p>
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