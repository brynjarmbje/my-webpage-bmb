import React from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturedProject from './FeaturedProject';
import AboutTeaser from './AboutTeaser';
import LatestNews from './LatestNews';
import '../styles/HomePage.css'; // Assuming you'll create a CSS file for styling
import MusicPage from './MusicPage';
import Mylla from './Mylla';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <WelcomeSection />
      <FeaturedProject />
      <AboutTeaser />
      <LatestNews />
      <MusicPage />
      <Mylla />
    </div>
  );
};

export default HomePage;