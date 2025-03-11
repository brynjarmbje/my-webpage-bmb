import React from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturedProject from './FeaturedProject';
import AboutTeaser from './AboutTeaser';
import '../styles/HomePage.css'; // Assuming you'll create a CSS file for styling
import MusicPage from './MusicPage';
import ContactCTA from './ContactCTA';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <WelcomeSection />
      <div className="divider">
      <AboutTeaser />
      <FeaturedProject />
      </div>
      <h3><Link to="/music" className='music-link'>Player and music creations</Link></h3>

      <MusicPage />
      <ContactCTA />
    </div>
  );
};

export default HomePage;