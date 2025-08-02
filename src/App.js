import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPage from './components/MusicPage';
import MyBio from './components/MyBio';
// import HomePage from './components/HomePage';
import MyllaBoard from './components/mylla/MyllaBoard'; // Ensure correct path
import { AuthProvider } from './AuthContext';
import MusicCompositionsPage from './components/MusicCompositionsPage';
import MusicVideoCV from './components/MusicVideoCV';
import NewHomePage from './components/NewHomePage';

// Create a new component to handle the content and routing
function Content() {
  // This component will now correctly have access to `useLocation`
  const location = useLocation();
  const isMyllaPage = location.pathname === '/mylla';
  const hideLogo = location.pathname === '/new-home';

  useEffect(() => {
    // Check if the current path is '/music' and adjust body class accordingly
    if (location.pathname === '/music') {
      document.body.classList.add('no-animation');
    } else {
      document.body.classList.remove('no-animation');
    }
  }, [location.pathname]); // Depend on location.pathname to re-run when it changes


  return (
    <>
      <Header isMyllaPage={isMyllaPage} hideLogo={hideLogo} />
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/bio" element={<MyBio />} />
        <Route path="/mylla" element={<MyllaBoard />} />
        <Route path="/music-compositions" element={<MusicCompositionsPage />} />
        <Route path="/music-video-cv" element={<MusicVideoCV />} />
        {/* Optionally keep /new-home for direct access, or remove if not needed */}
        <Route path="/new-home" element={<NewHomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Render the new Content component inside the Router */}
          <Content />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
