import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPage from './components/MusicPage';
import MyBio from './components/MyBio';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="Routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/bio" element={<MyBio />} /> {/* Add the route for MyBio */}
          {/* Define other routes as necessary */}
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
