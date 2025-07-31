import heroImg from '../images/bmb-eldgos.jpg';
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
  // Hero image style
  const heroImgStyle = {
    width: 'min(220px, 70vw)',
    height: 'min(220px, 70vw)',
    objectFit: /** @type {'cover'} */ ('cover'),
    borderRadius: '1.5rem',
    boxShadow: '0 6px 32px 0 #6c7a9244, 0 2px 16px 0 #23305a22',
    border: '2.5px solid #e3e7f1',
    margin: '0 auto 1.1rem auto',
    display: 'block',
    background: '#f7f8fa',
    transition: 'box-shadow 0.22s',
  };
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
    <motion.section
      key={lang}
      className="new-hero animated-hero"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <img src={heroImg} alt="Brynjar Már Björnsson smiling in front of a volcano" style={heroImgStyle} className="hero-img-mode" />
      <motion.p className="new-hero-subtitle animated-subtitle" variants={subtitleVariants} style={{ fontSize: '1.3rem', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
        {t.message}
      </motion.p>
      <motion.div className="new-hero-cta animated-cta" variants={ctaVariants}>
        <button className="new-btn secondary" type="button" onClick={() => scrollToSection('featured-section')}>{t.btn1}</button>
        <button className="new-btn secondary" onClick={() => scrollToSection('music-section')}>{t.btn2}</button>
        <button className="new-btn secondary" onClick={openResume}>{t.btn3}</button>
      </motion.div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-dot" />
      </div>
    </motion.section>
  );
};

export default AnimatedHero;
