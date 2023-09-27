import React, { useState } from 'react';
import axios from 'axios';

function EbookForm() {
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [suggestionContents, setSuggestionContents] = useState([
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
    'Suggestion content',
  ]);
  const [showGenerateButton, setShowGenerateButton] = useState(true);

  const handleOnChangeName = (event) => {
    setText(event.target.value);
  };

  const handleOnChangeSubject = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 30) {
      setSubject(inputValue);
    }
  };

  const fetchImageFromUnsplash = async (subject) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?query=${subject}&orientation=landscape&client_id=TfFspVHomEw5kDLWlGdD5viE3UGoRZGn9810NF6U1M0`
      );

      if (response.data.urls && response.data.urls.regular) {
        const coverImage = document.getElementById('coverImage');
        coverImage.src = response.data.urls.regular;

        // Set the title and author after fetching image
        document.querySelector('.enterTitle').textContent = subject; // Set the title to the subject
        document.querySelector('.bytext').textContent = `By: ${text}`; // Set the author to the name

        // Update suggestion contents
        setSuggestionContents((prevContents) => [
          subject, // Display the subject in the first suggestion
          ...prevContents.slice(0, -1), // Remove the last suggestion
        ]);

        // Hide the "Generate Cover" button and show "Regenerate" and "Next" buttons
        setShowGenerateButton(false);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const renderButtons = () => {
    if (showGenerateButton) {
      return (
        <button className="btn btn-primary mt-3" onClick={() => fetchImageFromUnsplash(subject)}>
          <img src="star.png" width="15" alt=''/>Generate Cover
        </button>
      );
    } else {
      return (
        <div className="mt-3">
          <button className="btn btn-outline-secondary mx-2" onClick={() => fetchImageFromUnsplash(subject)}>
            <img src="redo.png" width="15" alt=''/>Regenerate
          </button>
          <button className="btn btn-info ml-2" onClick={() => handleNextClick()}>
            Next
          </button>
        </div>
      );
    }
  };

  const handleNextClick = () => {
    // Add your next functionality here when the "Next" button is clicked.
    // You can define the behavior of the "Next" button in this function.
  };

  return (
    <>
      <div className="ebook-form-container">
        <h2>Generate ebook with AI</h2>
        <div className="form-group">
          <label className="form-header" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={text}
            onChange={handleOnChangeName}
          />
        </div>
        <div className="form-group">
          <label className="form-header" htmlFor="subject">
            Subject of ebook:
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter the subject of your ebook"
            value={subject}
            onChange={handleOnChangeSubject}
          />
        </div>
      </div>
      <label className='contentLabel' htmlFor="contentLabel">Suggestion based on subject & history</label>
      <div className="suggestion-cards-container">
        {suggestionContents.map((content, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <p className="card-text">{content}</p>
              <img src="history.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
            </div>
          </div>
        ))}
      </div>
      {renderButtons()}
    </>
  );
}

export default EbookForm;
