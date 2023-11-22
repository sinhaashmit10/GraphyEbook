import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Left from './components/Left';
import Right from './components/Right';
import EbookDisplay from './components/EbookDisplay';

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

function AppContent() {
  // Get the current location inside the component rendered by <Router>
  const location = useLocation();

  // Check if the current route is '/EbookDisplay'
  const isEbookDisplayRoute = location.pathname === '/EbookDisplay';

  return (
    <div className="appEbook">
      {!isEbookDisplayRoute && <Left />}
      {!isEbookDisplayRoute && <Right />}
      
      <Routes>
        <Route path="/EbookDisplay" element={<EbookDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
