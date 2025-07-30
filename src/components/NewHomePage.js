import React, { useEffect } from 'react';

import AnimatedHero from './AnimatedHero';
import AnimatedFeatured from './AnimatedFeatured';
import AnimatedMusic from './AnimatedMusic';
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
      {/* If any of these components render the B M B title, remove it from those components. */}
      {/* Informal, cool hero message only (no About section) */}
      <AnimatedHero />
      <AnimatedFeatured />
      <AnimatedMusic />
    </div>
  );
};

export default NewHomePage;
