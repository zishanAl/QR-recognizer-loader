import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QRScanner from './components/scanner/scanner'; // Ensure this path matches the actual file structure
import ModelUploader from './components/modelUploader/Uploader'; // Ensure this path matches the actual file structure
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="navbar-brand">QR Recognition</div>
            <ul className="navbar-links">
              <li>
                <Link to="/qrscanner">Scan QR</Link>
              </li>
              <li>
                <Link to="/modeluploader">Upload Model</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/qrscanner" element={<QRScanner />} />
            <Route path="/modeluploader" element={<ModelUploader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
