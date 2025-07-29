import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';


const heroVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.39,0.575,0.565,1] } }
};
const titleVariants = {
  hidden: { opacity: 0, scale: 0.7, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, delay: 0.2 } }
};
const subtitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
};
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 0.8, type: 'spring', stiffness: 120 } }
};

const AnimatedHero = () => {
  const { lang } = useLanguage();
  const content = {
    is: {
      title: 'Velkomin í heim Brynjars Más Björnssonar',
      subtitle: 'Tónskáld. Forritari. Nýsköpunarmaður.',
      btn1: 'Skoða ferilskrá',
      btn2: 'Hlusta á tónlist',
    },
    en: {
      title: `Welcome to Brynjar Már Björnsson's World`,
      subtitle: 'Composer. Developer. Innovator.',
      btn1: 'Explore Portfolio',
      btn2: 'Listen to Music',
    }
  };
  const t = content[lang];
  return (
    <motion.section className="new-hero animated-hero" initial="hidden" animate="visible" variants={heroVariants}>
      <motion.h1 className="new-hero-title animated-title" variants={titleVariants}>
        {t.title}
      </motion.h1>
      <motion.p className="new-hero-subtitle animated-subtitle" variants={subtitleVariants}>
        {t.subtitle}
      </motion.p>
      <motion.div className="new-hero-cta animated-cta" variants={ctaVariants}>
        <button className="new-btn primary">{t.btn1}</button>
        <button className="new-btn secondary">{t.btn2}</button>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHero;
