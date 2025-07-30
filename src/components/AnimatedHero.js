import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';


const heroVariants = {
  hidden: { opacity: 0, y: -80, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1 } }
};
const subtitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
};
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }
};

const AnimatedHero = () => {
  const { lang } = useLanguage();
  // PDF links
  const pdfLinks = {
    is: '/data/Ferilskra_Brynjar.pdf',
    en: '/data/Ferilskra_Brynjar_Eng.pdf',
  };
  const content = {
    is: {
      message: `Hæ! Brynjar Már Björnsson hér. Endilega skoðaðu þig um`,
      btn1: 'Verkefni',
      btn2: 'Tónlist',
      btn3: 'Ferilskrá',
    },
    en: {
      message: `Hi! Brynjar Már Björnsson here. Feel free to look around`,
      btn1: 'Projects',
      btn2: 'Music',
      btn3: 'Resume',
    }
  };
  const t = content[lang];

  // Scroll to section helpers
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open PDF in new tab
  const openResume = () => {
    window.open(pdfLinks[lang], '_blank');
  };

  return (
    <motion.section className="new-hero animated-hero" initial="hidden" animate="visible" variants={heroVariants}>
      <motion.p className="new-hero-subtitle animated-subtitle" variants={subtitleVariants} style={{ fontSize: '1.3rem', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
        {t.message}
      </motion.p>
      <motion.div className="new-hero-cta animated-cta" variants={ctaVariants}>
        <button className="new-btn secondary" type="button" onClick={() => scrollToSection('featured-section')}>{t.btn1}</button>
        <button className="new-btn secondary" onClick={() => scrollToSection('music-section')}>{t.btn2}</button>
        <button className="new-btn secondary" onClick={openResume}>{t.btn3}</button>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHero;
