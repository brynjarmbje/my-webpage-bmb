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
      <AnimatedHero />
      <AnimatedFeatured />
      <AnimatedMusic />
      <SnapFooter />
    </div>
  );
};

export default NewHomePage;
