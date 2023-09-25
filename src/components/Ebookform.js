import React, {useState} from 'react';
import axios from 'axios';

function EbookForm(setState) {

  const [text, setText] = useState('');
  const [subject, setSubject] = useState ('');
  
  const handleOnChangeName = (event)=> {
    setText(event.target.value)
    
  }

  const handleOnChangeSubject = (event)=> {
    setSubject(event.target.value)
  }
  const fetchImageFromUnsplash = async (subject) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?query=${subject}&orientation=landscape&client_id=TfFspVHomEw5kDLWlGdD5viE3UGoRZGn9810NF6U1M0`
      );

      if (response.data.urls && response.data.urls.regular) {
        const coverImage = document.getElementById('coverImage');
        coverImage.src = response.data.urls.regular;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleOnCLick = () =>{
    fetchImageFromUnsplash(subject);
  }
  
  const suggestions = [
    // { title: 'Suggestion ', content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
    {  content: 'Suggestion content ' },
  ];

  return (
    <>
    <div className="ebook-form-container">
      <h2>Generate ebook with AI</h2>
      <div className="form-group">
        <label className = "form-header" htmlFor="name">Name:</label>
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
        <label className = "form-header" htmlFor="subject">Subject of ebook:</label>
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
    <div className="suggestion-cards-container">
    {suggestions.map((suggestion, index) => (
      <div className="card" key={index}>
        <div className="card-body">
          <h5 className="card-title">{suggestion.title}</h5>
          <p className="card-text">{suggestion.content}</p>
        </div>
      </div>
    ))}
  </div>
  {/* eslint-disable-next-line */}
    <button className="btn btn-primary mt-3" onClick={handleOnCLick}><img src="star.png" width="15"/>Generate Cover</button>
  </>
  );
}

export default EbookForm;
