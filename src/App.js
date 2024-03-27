import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuComponent from './components/MenuComponent';
import MusicPage from './components/MusicPage';
import MyBio from './components/MyBio';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="Routes">
        <Routes>
          <Route path="/" element={<MusicPlayer />} />
          <Route path="/menu" element={<MenuComponent />} />
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
