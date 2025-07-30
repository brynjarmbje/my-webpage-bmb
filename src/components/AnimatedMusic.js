import React from 'react';
import { motion } from 'framer-motion';
import AnimatedMusicPlayer from './AnimatedMusicPlayer';


const musicVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, delay: 0.7 } }
};

const AnimatedMusic = () => {
  // No title, so no need for lang
  return (
    <motion.section id="music-section" className="new-music animated-music" initial="hidden" animate="visible" variants={musicVariants} style={{ background: 'none', boxShadow: 'none', border: 'none', paddingTop: 0 }}>
      <AnimatedMusicPlayer />
    </motion.section>
  );
};

export default AnimatedMusic;
