import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPage from './components/MusicPage';
import MyBio from './components/MyBio';
import HomePage from './components/HomePage';
import MyllaBoard from './components/mylla/MyllaBoard'; // Ensure correct path
import { AuthProvider } from './AuthContext';

// Create a new component to handle the content and routing
function Content() {
  // This component will now correctly have access to `useLocation`
  const location = useLocation();
  const isMyllaPage = location.pathname === '/mylla';

  return (
    <>
      <Header isMyllaPage={isMyllaPage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/bio" element={<MyBio />} />
        <Route path="/mylla" element={<MyllaBoard />} />
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
