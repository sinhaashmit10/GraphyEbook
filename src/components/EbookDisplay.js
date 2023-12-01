import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'react-toastify/dist/ReactToastify.css';
import OpenAI from 'openai';
import html2pdf from 'html2pdf.js';

export default function EbookDisplay() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [ebookContent, setEbookContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [bookDetails, setBookDetails] = useState({});
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

        setBookDetails({
          imageUrl: data.imageUrl,
          name: data.name,
          subject: subject,
        });

        generateEbookContent(subject);
      });
    });

    // eslint-disable-next-line
  }, []);

  const generateEbookContent = async (subject) => {
    try {
      const messages = [
        { role: 'system', content: `You are a professional e-book content generator.` },
        { role: 'user', content: `Write the ${keyTopics} on ${subject} in the table of contents. No explanations. Return the result in markdown.` },
        // { role: 'assistant', content: `Here is the table of contents:` }, // Assistant provides the context
      ];
  
      const response1 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${subject}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
      const unsplashResponse = await fetch(unsplashApiUrl);

      if (!unsplashResponse.ok) {
        throw new Error(`Failed to fetch Unsplash image. Status: ${unsplashResponse.status}`);
      }

      const unsplashData = await unsplashResponse.json();
      const unsplashImageUrl = unsplashData.urls.regular;

      console.log('Unsplash Image URL:', unsplashImageUrl);

      const userPrompt2 = `Now, write detailed content of about ${selectedPages} pages for each ${keyTopics} of the subject ${subject}. Content should be targeted ${selectedAudience} Write the heading of the topic in h2. Ensure the content is professional and suitable for direct use in the e-book. Include sub-headings in h3 for each topic and write three paragraphs of informative content for each sub-heading. Also, use Unsplash for relevant images: ![Unsplash Image](${unsplashImageUrl}) Return the result in markdown.`;
  
      const response2 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: userPrompt2 }],
      });
  
      const userPrompt3 = `Finally, write a conclusion that summarizes the entire e-book on the subject ${subject}. Return the result in markdown.`;
  
      const response3 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: userPrompt3 }],
      });
  
      // Combine the responses if needed
      const assistantReply = response1.choices[0].message.content + '\n\n' + response2.choices[0].message.content + '\n\n' + response3.choices[0].message.content;
  
      setEbookContent(assistantReply);
    } catch (error) {
      console.error('Error generating ebook content:', error);
      alert('Failed to generate the ebook content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateEbookContent = () => {
    setEbookContent('');
    setIsLoading(true);
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

        generateEbookContent(subject);
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
    closeModal();
    var element = document.getElementById('gen-content');
    var opt = {
      margin: 20,
      filename: 'ebook.pdf',
      image: {type: 'jpeg', quality: 0.98},
    };
    html2pdf().from(element).set(opt).save();
  };

  if (isLoading) {
    return (
      <div id='card-side2' className='card-side2' style={{ marginTop: '2.5rem' }}>
        <div className='loadingSpinner'></div>
      </div>
    );
  }

  return (
    <>
      <div id='card-side2' className='card-side2' style={{ marginTop: '2.5rem' }}>
        <div id='gen-content' className="gen-content">
        <div className="book-details">
          <img id="coverImage2" src={bookDetails.imageUrl} alt={bookDetails.name} />
          <h1 className="enterTitle">{bookDetails.subject}</h1>
          <div className="sideViewBottom2">
            <p className="bytext">by: {bookDetails.name}</p>
            <img src="graphylogo2.svg" alt="" id='graphyLogoSideView2'/>
          </div>
          <div class="html2pdf__page-break"></div>
        </div>
        <div className="ebook-content" style={{ maxHeight: '550px', overflow: 'auto' }}>
          {ebookContent === "not-found" ? (
            <p>Ebook content not found.</p>
          ) : (
            <ReactMarkdown children={ebookContent} 
            components={{
              p: ({ node, ...props }) => <div style={{ fontSize: '12px',fontWeight:'400' }} {...props} />,
              // eslint-disable-next-line
              // li: ({ node, ...props }) => <div style={{ fontSize: '12px',fontWeight:'400' }} {...props} />,
              // eslint-disable-next-line
              h1: ({ node, ...props }) => <h1 style={{ fontSize: '24px', fontWeight:'700' }} {...props} />,
              // eslint-disable-next-line
              h2: ({ node, ...props }) => <h2 style={{ fontSize: '24px', marginTop:'10px', fontWeight:'700' }} {...props} />,
              // eslint-disable-next-line
              h3: ({ node, ...props }) => <h3 style={{ fontSize: '16px', fontWeight:'700', marginTop:'5px' }} {...props} />,
              img: ({ node, ...props }) => <img style={{width: '100%', height: '200px', objectFit: 'cover'}}alt="" {...props} />,
            }}/>
          )}
        </div>
        </div>
      </div>
      <div className='regen-ebook'>
        <img src="graphylogo2.svg" alt="" className="logo-display" />
        <button id='regen-button' className="btn btn-light mx-1" onClick={regenerateEbookContent} disabled={isLoading}>
          {isLoading ? "Regenerating..." : <><img className='regenImage' src="redoblack.svg" width="15" alt='' /> <span className="regenText">Regenerate</span></>}
        </button>

        <button id='download-button' className='btn btn-light mx-1' onClick={openModal}>
          <img className='downloadImage' src="./download.svg" alt="" /> <span className="downloadText"> Download PDF </span>
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
    </>
  );
}
