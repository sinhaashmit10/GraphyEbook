import React from 'react';
import EbookForm from './Ebookform';
import Navbar from './Navbar';
import KeyTopics from './KeyTopics';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";

export default function Left() {
  return (
    <Router>
      <div className="left">
        <Navbar />
        <Routes>
          <Route path="/" element={<EbookForm />}/>
          <Route path="/KeyTopics" element={<KeyTopics />} />
        </Routes>
      </div>
    </Router>
  );
}
