import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/database';
import 'react-toastify/dist/ReactToastify.css';
import OpenAI from 'openai';

export default function EbookDisplay() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [ebookContent, setEbookContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  const { selectedAudience, selectedPages, keyTopics } = location.state;

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const ebooksRef = database.ref('ebooks');

    ebooksRef.limitToLast(1).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const subject = data.subject;

        if (ebookContent === '') {
          generateEbookContent(subject);
        }
      });
    });

    // eslint-disable-next-line
  }, []);

  const generateEbookContent = async (subject) => {
    try {
      setIsLoading(true);

      const messages = [
        { role: 'system', content: `You are a professional e-book content generator.`},
        { role: 'user', content: `Generate a table of contents for ${selectedPages}-page e-book on the subject: ${subject} covering key topics: ${keyTopics} for a selected audience: ${selectedAudience}. Return the result in markdown.`},
        { role: 'user', content: 'Write the content for every topic in a detailed manner, explain the topic professionally, give sub-headings for every topic and write a paragraph of content for that sub-heading, and make the paragraphs as long as possible. Every topic should have atleast two paragraphs.'},
        { role: 'user', content: 'Write a conclusion which summarizes the whole e-book.'}
      ];

      // Send the user's message to GPT-3.5 Turbo
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        // max_tokens:3000,
      });

      if (response.choices && response.choices.length > 0) {
        const assistantReply = response.choices[0].message.content;
        setEbookContent(assistantReply);
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
    setEbookContent(''); // Set ebookContent to an empty string to trigger regeneration
  
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };
  
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  
    const database = firebase.database();
    const ebooksRef = database.ref('ebooks');
  
    ebooksRef.limitToLast(1).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const subject = data.subject;
  
        generateEbookContent(subject); // Call generateEbookContent with the retrieved subject
      });
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDownloadPDF = () => {
    // Handle the download PDF action here
    // You can send the email and trigger the PDF download
    closeModal(); // Close the modal after download
  };

  if (isLoading) {
    return (
      <div className='card-side2'>
        <div className='loadingSpinner'></div>
      </div>
    );
  }

  return (
    <div className='card-side2'>
      <div className="ebook-content" style={{ maxHeight: '550px', overflow: 'auto' }}>
        {ebookContent === "not-found" ? (
          <p>Ebook content not found.</p>
        ) : (
          <ReactMarkdown children={ebookContent} />
        )}
      </div>

      <div className='regen-ebook'>
        <img src="graphylogo2.svg" alt="" className="logo-display" />
        <button id='regen-button' className="btn btn-light mx-1" onClick={regenerateEbookContent} disabled={isLoading}>
          {isLoading ? "Regenerating..." : <><img src="redoblack.svg" width="15" alt='' /> Regenerate</>}
        </button>

        <button id='download-button' className='btn btn-light mx-1' onClick={openModal}>
          <img src="./download.svg" alt="" /> Download PDF
        </button>

        <button id='publish-button' className='btn btn-light mx-1'>
          <img src="./star.svg" alt="" /> Publish ebook
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Download ebook"
        style={{
          content: {
            width: '500px',
            height: '256px',
            margin: 'auto',
            background: 'white',
            borderRadius: '24px',
            border: '1px solid rgba(233,233,242,1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <button className="close-button" onClick={closeModal}>
          <img src="./cross.svg" alt="" />
        </button>

        <h2 className='modalTitle'>Download ebook</h2>
        <form className='modalForm'>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button id='modalDownload' className="btn btn-primary" onClick={handleDownloadPDF}>
            <img src="downloadwhite.svg" alt="" className="modal-button-icon" />
            Download PDF
          </button>
        </form>
      </Modal>
    </div>
  );
}
