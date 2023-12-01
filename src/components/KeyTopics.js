import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import the "compat" version of Firebase
import 'firebase/compat/database'; // Import Firebase Realtime Database module;
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function KeyTopics() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [keyTopics, setKeyTopics] = useState('');
  const [selectedPages, setSelectedPages] = useState('');
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const showEmptyFieldsToast = () => {
    toast.error('Please fill all the details.', {
      autoClose: 5000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleGenerateClick = () => {
    if (keyTopics.trim() && selectedAudience && selectedPages) {
      navigate('/EbookDisplay', { state: { keyTopics, selectedAudience, selectedPages } });
    } else {
      showEmptyFieldsToast();
    }
  };

  const handleRadioChange = (e) => {
    setSelectedAudience(e.target.value);
  };

  const handleTopicsChange = (e) => {
    setKeyTopics(e.target.value);
  };

  const handleInputChange = (e) => {
    const inputPages = e.target.value;
    if (inputPages === '' || (Number.isInteger(Number(inputPages)) && Number(inputPages) >= 0)) {
      setSelectedPages(inputPages);
    }
  };  

  return (
    <>
      <div id='keyTopicsForm' className='ebook-form-container'>
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

        <div className="form-group2">
          <label id='targetAudience' className="form-header">Target Audience</label>
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
                    <img src={`${audience.toLowerCase()}.svg`} alt="" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="audienceCounter">
            <label id='audienceHeader' className="form-header">No. of content pages</label>
            <div className="input-group">
              <button id='minusBtn' type="button" onClick={() => setSelectedPages((prevPages) => Math.max(Number(prevPages) - 1, 1))}>
                -
              </button>
              <input
                type="number"
                id='pageNum'
                className="form-control"
                value={selectedPages}
                onChange={handleInputChange}
              />
              <button id='plusBtn' type="button" onClick={() => setSelectedPages((prevPages) => Math.max(Number(prevPages) + 1, 1))}>
                +
              </button>
            </div>
          </div>
        </div>

        <button id='generateEbookBtn' className="btn btn-success mt-3" onClick={handleGenerateClick}>
        
            <>
              <img src="star.svg" width="15" alt=''/>
              Generate ebook
            </>
          
        </button>
        <ToastContainer />
      </div>
    </>
  );
}