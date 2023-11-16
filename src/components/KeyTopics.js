import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import the "compat" version of Firebase
import 'firebase/compat/database'; // Import Firebase Realtime Database module;
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
export default function KeyTopics() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [keyTopics, setKeyTopics] = useState('');
  const [selectedPages, setSelectedPages] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
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

  const handlePagesChange = (pages) => {
    setSelectedPages(pages);
  };

  return (
    <>
    <Navbar/>
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
                  <img src={`${audience.toLowerCase()}.svg`} alt="" />
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

      <button id='generateEbookBtn' className="btn btn-success mt-3" onClick={handleGenerateClick}>
        {loading ? <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div> : <><img src="star.svg" width="15" alt=''/>Generate ebook</>}
      </button>
      <ToastContainer />
    </div>
    </>
  );
}
