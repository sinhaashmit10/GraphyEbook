// KeyTopics.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import the "compat" version of Firebase
import 'firebase/compat/database'; // Import Firebase Realtime Database module

export default function KeyTopics() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [keyTopics, setKeyTopics] = useState('');
  const [selectedPages, setSelectedPages] = useState(1); // Initialize with a default value
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual GPT-3 API key
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const database = firebase.database();

  const handleRadioChange = (e) => {
    setSelectedAudience(e.target.value);
  };

  const handleTopicsChange = (e) => {
    setKeyTopics(e.target.value);
  };

  const handlePagesChange = (pages) => {
    setSelectedPages(pages);
  };

  const generateEbookContent = async () => {
    try {
      // Retrieve the subject from the last created data in the database
      const ebooksRef = database.ref('ebooks');
      ebooksRef.limitToLast(1).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const subject = data.subject;

          // Use the subject in the API request
          fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              prompt: `Generate a ${selectedPages}-page ebook with the title "Introduction to ${subject}" covering key topics: ${keyTopics} for a ${selectedAudience}.
              Make a proper list of contents with the names of the chapter with their respective page numbers. Divide the ebook pages properly and use 
              bold headings for every chapter. Feel free to use tables, datas, research reference etc. Write professional content as I will directly use
              the generated content in my Ebook. According to the number of pages, every page must contain at least 100 words.`,
              max_tokens: 1000, // Adjust as needed
            }),
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to generate ebook content');
            }
          })
          .then((data) => {
            console.log('API Response:', data); // Log the API response

            const ebookContent = data.choices[0].text;

            // Pass ebookContent as route state when navigating to Ebook
            navigate('/Ebook', { state: { ebookContent, subject, keyTopics, selectedAudience, selectedPages } });
          })
          .catch((error) => {
            console.error('Error generating ebook content:', error);
            alert('Failed to generate the ebook content. Please try again later.');
          });
        });
      });
    } catch (error) {
      console.error('Error retrieving subject from Firebase:', error);
      alert('Failed to retrieve subject from Firebase. Please try again later.');
    }
  };

  const handleGenerateClick = () => {
    if (keyTopics.trim() && selectedAudience && selectedPages) {
      generateEbookContent();
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
                  <img src={`${audience.toLowerCase()}.png`} alt="" />
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-group dropend">
          <button id='pageCounter' className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            No. of pages: {selectedPages}
          </button>
          <ul className="dropdown-menu">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((pages) => (
              <li key={pages}>
                <button
                  className="dropdown-item"
                  onClick={() => handlePagesChange(pages)}
                >
                  {pages}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="btn btn-success mt-3" onClick={handleGenerateClick}>
        <img src="star.png" width="15" alt=''/>Generate ebook
      </button>
    </div>
  );
}