import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import the "compat" version of Firebase
import 'firebase/compat/database'; // Import Firebase Realtime Database module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

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

  // Initialize Firebase with your Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const database = firebase.database();
  const navigate = useNavigate();

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
    if (!text || !subject) {
      showEmptyFieldsToast();
      return;
    }

    try {
      const unsplashApiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?query=${subject}&orientation=landscape&client_id=${unsplashApiKey}`
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

        // After fetching the image, save the name and subject to Firebase
        saveDataToFirebase({ name: text, subject });
      } else {
        showImageFetchErrorToast();
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      showImageFetchErrorToast();
    }
  };

  const showEmptyFieldsToast = () => {
    toast.error('Please fill all the details.', {
      autoClose: 5000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showImageFetchErrorToast = () => {
    toast.error('Unable to fetch image, please try again.', {
      autoClose: 5000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const saveDataToFirebase = (data) => {
    // Push the data to Firebase's "ebooks" node
    const ebooksRef = database.ref('ebooks');
    ebooksRef.push(data, (error) => {
      if (error) {
        console.error('Error saving data to Firebase:', error);
      } else {
        console.log('Data saved to Firebase successfully');
      }
    });
  };

  const renderButtons = () => {
    if (showGenerateButton) {
      return (
        <button className="btn btn-primary mt-3" onClick={() => fetchImageFromUnsplash(subject)}>
          <img src="star.svg" width="15" alt=''/>Generate Cover
        </button>
      );
    } else {
      return (
        <div className="mt-3">
          <button className="btn btn-outline-secondary mx-2" onClick={() => fetchImageFromUnsplash(subject)}>
            <img src="redo.svg" width="15" alt=''/>Regenerate
          </button>
          <button className="btn btn-info ml-2" onClick={handleNextClick}>
            Next
          </button>
        </div>
      );
    }
  };

  const handleNextClick = () => {
    // Navigate to KeyTopics.js when the "Next" button is clicked and pass subject as a prop
    navigate('/KeyTopics', { state: { subject } });
  };

  return (
    <>
    <Navbar/>
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
      <ToastContainer />
    </>
  );
}

export default EbookForm;
