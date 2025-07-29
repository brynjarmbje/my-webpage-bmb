import React, { useEffect } from 'react';

import AnimatedHero from './AnimatedHero';
import AnimatedAbout from './AnimatedAbout';
import AnimatedFeatured from './AnimatedFeatured';
import AnimatedMusic from './AnimatedMusic';
import AnimatedContact from './AnimatedContact';
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
      <AnimatedAbout />
      <AnimatedFeatured />
      <AnimatedMusic />
      <AnimatedContact />
    </div>
  );
};

export default NewHomePage;
