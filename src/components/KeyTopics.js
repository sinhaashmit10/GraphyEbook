import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Import the "compat" version of Firebase
import 'firebase/compat/database'; // Import Firebase Realtime Database module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function KeyTopics() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [keyTopics, setKeyTopics] = useState('');
  const [selectedPages, setSelectedPages] = useState(1); // Initialize with a default value
  const [loading, setLoading] = useState(false); // Add loading state
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

  const showEmptyFieldsToast = () => {
    toast.error('Please fill all the details.', {
      autoClose: 5000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const generateEbookContent = async () => {
    if (!keyTopics.trim() || !selectedAudience) {
      showEmptyFieldsToast();
      return;
    }

    setLoading(true); // Set loading state to true

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
              prompt: `Generate a ${selectedPages}-page eBook with the title "Introduction to ${subject}" covering key topics: ${keyTopics} for 
              a ${selectedAudience}. The eBook should provide detailed and comprehensive information about the following key 
              topics: ${keyTopics}. Each page in the eBook should contain a minimum of 1000 words to ensure thorough coverage of the 
              subject matter. Please ensure that the eBook is well-structured and organized. Create a proper table of contents with 
              the names of each chapter and their respective page numbers. Additionally, use bold headings to clearly delineate different 
              sections within the eBook. Feel free to incorporate relevant tables, data, research references, and visual elements to 
              enhance the content. The content should be written in a professional and informative style, as it will be used directly in 
              the eBook. Make sure to maintain the quality and consistency of the content throughout the eBook, ensuring that it provides 
              valuable insights and knowledge to the selected audience. Your eBook should be an informative and engaging resource for 
              readers, offering them a comprehensive understanding of the subject and key topics, while also meeting the requirement of a 
              minimum of 1000 words per page.`,
              max_tokens: 3000, // Adjust as needed
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
            navigate('/EbookDisplay', { state: { ebookContent, subject, keyTopics, selectedAudience, selectedPages } });
          })
          .catch((error) => {
            console.error('Error generating ebook content:', error);
            alert('Failed to generate the ebook content. Please try again later.');
          })
          .finally(() => {
            setLoading(false); // Set loading state back to false when done
          });
        });
      });
    } catch (error) {
      console.error('Error retrieving subject from Firebase:', error);
      alert('Failed to retrieve subject from Firebase. Please try again later.');
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  const handleGenerateClick = () => {
    if (keyTopics.trim() && selectedAudience && selectedPages) {
      generateEbookContent();
    } else {
      showEmptyFieldsToast();
    }
  };

  return (
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
  );
}
