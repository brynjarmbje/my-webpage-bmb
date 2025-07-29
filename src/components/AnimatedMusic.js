import React from 'react';
import { motion } from 'framer-motion';
import AnimatedMusicPlayer from './AnimatedMusicPlayer';
import { useLanguage } from '../LanguageContext';


const musicVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, delay: 0.7, ease: [0.39,0.575,0.565,1] } }
};

const AnimatedMusic = () => {
  const { lang } = useLanguage();
  const titles = { is: 'Tónlist', en: 'Music' };
  return (
    <motion.section className="new-music animated-music" initial="hidden" animate="visible" variants={musicVariants}>
      <motion.h2 className="animated-section-title" style={{ textAlign: 'center', marginBottom: '1.2rem', fontSize: '2rem' }}>
        {titles[lang]}
      </motion.h2>
      <AnimatedMusicPlayer />
    </motion.section>
  );
};

export default AnimatedMusic;
