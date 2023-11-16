import React from 'react';
import EbookForm from './Ebookform';
// import Navbar from './Navbar';
import KeyTopics from './KeyTopics';
import { Routes, Route,} from "react-router-dom";
import EbookDisplay from './EbookDisplay';

export default function Left() {
  return (
    // <Router>
      <div className="left">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<EbookForm />}/>
          <Route path="/KeyTopics" element={<KeyTopics />} />
          <Route path="/EbookDisplay" element={<EbookDisplay/>}/>
        </Routes>
      </div>
    // </Router>
  );
}