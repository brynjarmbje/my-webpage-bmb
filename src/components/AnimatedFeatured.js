import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';


const featuredVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, delay: 0.5, ease: [0.39,0.575,0.565,1] } }
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, delay: 0.7 } }
};
const imageVariants = {
  hidden: { opacity: 0, rotateY: 180, scale: 0.7 },
  visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.8, delay: 1 } }
};
const descVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }
};

const AnimatedFeatured = () => {
  const { lang } = useLanguage();
  const content = {
    is: {
      section: 'Valin Verkefni',
      project: 'Mylla – Nútímalegur borðspilaleikur',
      desc: 'React, Firebase, Web Audio API',
    },
    en: {
      section: 'Featured Project',
      project: 'Mylla – Modern Board Game',
      desc: 'React, Firebase, Web Audio API',
    }
  };
  const t = content[lang];
  return (
    <motion.section className="new-featured animated-featured" initial="hidden" animate="visible" variants={featuredVariants}>
      <motion.h2 className="animated-section-title" variants={cardVariants}>{t.section}</motion.h2>
      <motion.div className="new-featured-card animated-featured-card" variants={cardVariants}>
        <motion.div className="new-featured-image animated-featured-image" variants={imageVariants} />
        <motion.div className="new-featured-description animated-featured-description" variants={descVariants}>
          <h3>{t.project}</h3>
          <p>{t.desc}</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedFeatured;
