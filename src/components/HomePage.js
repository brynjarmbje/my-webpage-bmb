import React from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturedProject from './FeaturedProject';
import AboutTeaser from './AboutTeaser';
import '../styles/HomePage.css'; // Assuming you'll create a CSS file for styling
import MusicPage from './MusicPage';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <WelcomeSection />
      <FeaturedProject />
      <AboutTeaser />
      <MusicPage />
    </div>
  );
};

export default HomePage;