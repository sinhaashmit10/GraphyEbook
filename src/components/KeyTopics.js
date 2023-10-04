import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function KeyTopics() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [keyTopics, setKeyTopics] = useState('');
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual GPT-3 API key

  const handleRadioChange = (e) => {
    setSelectedAudience(e.target.value);
  };

  const handleTopicsChange = (e) => {
    setKeyTopics(e.target.value);
  };

  const handleOnClick = async () => {
    // Validate if keyTopics and selectedAudience are not empty
    if (!keyTopics.trim()) {
      alert('Please enter key topics.');
      return;
    }

    // Call GPT-3 API to generate the ebook content
    try {
      const ebookContent = await generateEbookContent(keyTopics);
      // Navigate to EbookDisplay and pass ebookContent
      navigate('/Ebook', { state: { ebookContent } });
    } catch (error) {
      console.error('Error generating ebook content:', error);
      alert('Failed to generate the ebook content. Please try again later.');
    }
  };

  const generateEbookContent = async (keyTopics) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Generate an ebook about ${keyTopics} for ${selectedAudience}.`,
          max_tokens: 1000, // Adjust as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Extract and return the generated ebook content
        return data.choices[0].text;
      } else {
        throw new Error('Failed to generate ebook content');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='ebook-form-container'>
      <h2>Generate ebook with AI</h2>
      <div className="form-group">
        <label className="form-header" htmlFor="topics">
          Key Topics
        </label>
        <input
          type='text'
          className="form-control"
          id="keytopics"
          placeholder="Enter topics separated by commas"
          value={keyTopics}
          onChange={handleTopicsChange}
        />
      </div>

      {/* Radio buttons organized in pairs */}
      <div className="form-group2">
        <label className="form-header">Target Audience</label>
        <div className="row">
          {['Kids', 'Student', 'Apprentice', 'Scholar', 'Expert', 'Thought Leader'].map((audience) => (
            <div className="col" key={audience}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id={`flexRadioDefault${audience}`}
                  value={audience}
                  checked={selectedAudience === audience}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor={`flexRadioDefault${audience}`}>
                  {audience}
                  <img src={`${audience.toLowerCase()}.png`} style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="btn btn-success mt-3" onClick={handleOnClick}>
        <img src="star.png" width="15" alt=''/>Generate ebook
      </button>
    </div>
  );
}
