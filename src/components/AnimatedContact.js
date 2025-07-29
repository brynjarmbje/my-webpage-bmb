import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';


const contactVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, delay: 1, ease: [0.39,0.575,0.565,1] } }
};
const titleVariants = {
  hidden: { opacity: 0, scale: 0.7, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 1.1 } }
};
const btnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 1.2, type: 'spring', stiffness: 120 } }
};

const AnimatedContact = () => {
  const { lang } = useLanguage();
  const content = {
    is: { section: 'Hafa samband', btn: 'Hafa samband' },
    en: { section: 'Contact', btn: 'Get in Touch' }
  };
  const t = content[lang];
  return (
    <motion.section className="new-contact animated-contact" initial="hidden" animate="visible" variants={contactVariants}>
      <motion.h2 className="animated-section-title" variants={titleVariants}>{t.section}</motion.h2>
      <motion.button className="new-btn primary animated-contact-btn" variants={btnVariants}>
        {t.btn}
      </motion.button>
    </motion.section>
  );
};

export default AnimatedContact;
