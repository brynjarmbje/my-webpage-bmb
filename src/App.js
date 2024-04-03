import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPage from './components/MusicPage';
import MyBio from './components/MyBio';
import HomePage from './components/HomePage';
import MyllaBoard from './components//mylla/MyllaBoard';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/bio" element={<MyBio />} /> {/* Add the route for MyBio */}
            <Route path="/mylla" element={<MyllaBoard />} /> {/* Add the route for MyllaBoard */}
          </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      </AuthProvider>
  );
}

export default App;
