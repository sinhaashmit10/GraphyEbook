import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';

export default function EbookDisplay() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [ebookContent, setEbookContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const { selectedAudience, selectedPages, subject, keyTopics } = location.state;

  useEffect(() => {
    if (!ebookContent) {
      generateEbookContent();
    }
    // eslint-disable-next-line
  }, []);

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
      });

      if (response.ok) {
        const data = await response.json();
        const newEbookContent = data.choices[0].text;

        if (!newEbookContent) {
          setEbookContent("not-found");
        } else {
          setEbookContent(newEbookContent);
        }
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

  const formatEbookContent = () => {
    if (ebookContent === "not-found") {
      return <p>Ebook content not found.</p>;
    }

    const sections = ebookContent.split('\n');
    let formattedContent = [];
    let isContentsPage = true;

    for (const section of sections) {
      if (isContentsPage) {
        formattedContent.push(
          <div key={section} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {section}
          </div>
        );
        isContentsPage = false;
      } else {
        formattedContent.push(
          <div key={section} style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {section}
            </div>
          </div>
        );
      }
    }

    return formattedContent;
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
        {formatEbookContent()}
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
