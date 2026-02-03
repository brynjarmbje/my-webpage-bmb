import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

import cyberYolksImg from '../images/cyber_yolks_main.png';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, delay: 0.2 } }
};
const imageVariants = {
  hidden: { opacity: 0, rotateY: 180, scale: 0.7 },
  visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.8, delay: 0.3 } }
};
const descVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
};

const FeaturedSingleCard = () => {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div ref={ref} className="featured-single-container">
      <motion.a
        className="featured-card hugbotvo-card"
        href="https://brynjarmbje.github.io/Cyber-Blobs/"
        target="_blank"
        rel="noopener noreferrer"
        variants={cardVariants}
        animate={isInView ? 'visible' : 'hidden'}
        initial="hidden"
        whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #6c7a9255' }}
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        <motion.div
          className="featured-image cyber-yolks-image"
          style={{ backgroundImage: `url(${cyberYolksImg})` }}
          variants={imageVariants}
          animate={isInView ? 'visible' : 'hidden'}
          initial="hidden"
        />
        <motion.div
          className="featured-description"
          variants={descVariants}
          animate={isInView ? 'visible' : 'hidden'}
          initial="hidden"
          style={{ marginTop: '1.1rem', textAlign: 'center' }}
        >
          <h3 style={{ color: '#23305a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>
            Cyber Yolks
          </h3>
          <p style={{ color: '#23305a', marginBottom: '0.5rem', fontSize: '0.98rem', textAlign: 'center' }}>
            {lang === 'is' ? 'Nýr netleikur' : 'New browser game'}
          </p>
          <span className="featured-linktype" style={{ color: '#1a223a', fontSize: '0.95rem', fontWeight: 500 }}>
            {lang === 'is' ? 'Spila' : 'Play'}
          </span>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default FeaturedSingleCard;
