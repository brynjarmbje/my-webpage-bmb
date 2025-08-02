import React, { useEffect } from 'react';

import AnimatedHero from './AnimatedHero';
import AnimatedFeatured from './AnimatedFeatured';
import AnimatedMusic from './AnimatedMusic';
import SnapFooter from './SnapFooter';
import '../styles/NewHomePage.css';


const NewHomePage = () => {
  useEffect(() => {
    document.body.classList.add('no-indexcss');
    return () => {
      document.body.classList.remove('no-indexcss');
    };
  }, []);

  return (
    <div className="new-homepage-container">
      {/* Wide Desktop Layout */}
      <div className="wide-desktop-layout">
        <div className="left-column">
          <AnimatedFeatured />
        </div>
        <div className="center-column">
          <AnimatedHero />
        </div>
        <div className="right-column">
          <AnimatedMusic />
        </div>
      </div>
      
      {/* Standard Mobile/Tablet Layout */}
      <div className="standard-layout">
        <AnimatedHero />
        <AnimatedFeatured />
        <AnimatedMusic />
      </div>
      
      <SnapFooter />
    </div>
  );
};

export default NewHomePage;
