import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function KeyTopics() {
  const navigate = useNavigate();

  const handleOnCLick = () => {
  navigate('/Ebook')
}

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
        />
      </div>

      {/* Radio buttons organized in pairs */}
      <div className="form-group2">
        <label className="form-header">Target Audience</label>
        <div className="row">
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="form-check-label" for="flexRadioDefault1">
                Kids
                <img src="kids.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
              <label className="form-check-label" for="flexRadioDefault2">
                Student
                <img src="kids.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
              <label className="form-check-label" for="flexRadioDefault3">
                Apprentice
                <img src="apprentice.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"/>
              <label className="form-check-label" for="flexRadioDefault4">
                Scholar
                <img src="expert.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5"/>
              <label className="form-check-label" for="flexRadioDefault5">
                Expert
                <img src="expert.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6"/>
              <label className="form-check-label" for="flexRadioDefault6">
                Thought Leader
                <img src="expert.png" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <button className="btn btn-success mt-3" onClick={handleOnCLick} >
          <img src="star.png" width="15" alt=''/>Generate ebook
        </button>
    </div>
  );
}
