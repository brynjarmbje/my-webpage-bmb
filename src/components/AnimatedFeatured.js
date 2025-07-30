import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

import ProjectModal from './ProjectModal';
import dashImg from '../images/Fiix-Neuron_Dash.jpeg';
import sensImg from '../images/Fiix-Neuron_Sens.jpeg';


const featuredVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, delay: 0.5 } }
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
  // 4 projects: Mylla (site), Portfolio (site), Middleware, Hugbotvo
  const [modalOpen, setModalOpen] = useState(false);
  const projects = [
    {
      title: lang === 'is' ? 'Mylla – Online' : 'Mylla – Online TicTacToe',
      desc: 'React, Firebase, Web Audio API',
      image: require('../images/mylla.png'),
      link: '/mylla',
      linkType: lang === 'is' ? 'Á vefnum' : 'On this site',
      onClick: null,
    },
    {
      title: lang === 'is' ? 'Portfolio – Vefsíða' : 'Portfolio – Website',
      desc: 'React, Framer Motion',
      image: require('../images/bmb-logo2.png'),
      link: 'https://brynjar.dev',
      linkType: lang === 'is' ? 'Á vefnum' : 'Live site',
      onClick: null,
    },
    {
      title: 'Industrial IoT Middleware',
      desc: 'Python, JavaScript, Flask, Watchdog',
      image: dashImg,
      link: '#',
      linkType: lang === 'is' ? 'Skoða' : 'View',
      onClick: () => setModalOpen(true),
    },
    {
      title: lang === 'is' ? 'Læralærlær – Íslensku leikur' : 'Læralærlær – Language Game',
      desc: lang === 'is'
        ? 'Kotlin, Android, Jetpack'
        : 'Kotlin, Android, Jetpack',
      image: require('../images/laeralaerlaer.jpg'),
      link: 'https://github.com/brynjarmbje/hugbotvo-frontend-kotlin',
      linkType: lang === 'is' ? 'GitHub' : 'GitHub',
      onClick: null,
    },
  ];
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: '-40px' });
  const isInView2 = useInView(ref2, { once: true, margin: '-40px' });
  // Split projects into two groups for mobile
  const firstGroup = projects.slice(0, 2);
  const secondGroup = projects.slice(2);
  return (
    <>
      <motion.section
        ref={ref1}
        key={lang + '-1'}
        id="featured-section"
        className="new-featured animated-featured mobile-featured-group"
        initial="hidden"
        animate={isInView1 ? "visible" : "hidden"}
        variants={featuredVariants}
      >
        <motion.h2 className="animated-section-title" variants={cardVariants} animate={isInView1 ? "visible" : "hidden"} initial="hidden">
          {lang === 'is' ? 'Verkefni' : 'Projects'}
        </motion.h2>
        <div className="featured-grid">
          {firstGroup.map((proj, idx) => {
            const isHugbotvo = proj.title.includes('Læralærlær');
            const isMiddleware = proj.title.includes('Middleware');
            return (
              <motion.a
                key={proj.title}
                className={`featured-card${isHugbotvo ? ' hugbotvo-card' : ''}${isMiddleware ? ' middleware-card' : ''}`}
                href={proj.onClick ? undefined : proj.link}
                target={proj.link && proj.link.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                variants={cardVariants}
                animate={isInView1 ? "visible" : "hidden"}
                initial="hidden"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #6c7a9255' }}
                style={{ textDecoration: 'none', cursor: proj.onClick ? 'pointer' : 'pointer' }}
                onClick={proj.onClick ? (e) => { e.preventDefault(); proj.onClick(); } : undefined}
              >
                <motion.div
                  className={`featured-image${isHugbotvo ? ' hugbotvo-image' : ''}${isMiddleware ? ' middleware-image' : ''}`}
                  style={{ backgroundImage: `url(${proj.image})` }}
                  variants={imageVariants}
                  animate={isInView1 ? "visible" : "hidden"}
                  initial="hidden"
                />
                <motion.div className="featured-description" variants={descVariants} animate={isInView1 ? "visible" : "hidden"} initial="hidden" style={isHugbotvo || isMiddleware ? { marginTop: '1.1rem', textAlign: 'center' } : {}}>
                  <h3 style={{ color: '#23305a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>{proj.title}</h3>
                  <p style={{ color: '#23305a', marginBottom: '0.5rem', fontSize: '0.98rem', textAlign: 'center' }}>{proj.desc}</p>
                  <span className="featured-linktype" style={{ color: '#1a223a', fontSize: '0.95rem', fontWeight: 500 }}>{proj.linkType}</span>
                </motion.div>
              </motion.a>
            );
          })}
        </div>
        <ProjectModal
          key={lang}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          dashImg={dashImg}
          sensImg={sensImg}
          description={lang === 'is'
            ? 'Middleware lausn sem tengir skynjara við vélar og sendir mæligögn í stjórnunarkerfi. Skrifuð í Python og JavaScript, tengist tveimur API-um, sýnir rauntímagögn og viðvaranir.'
            : 'Middleware project (Python, JavaScript) that connects sensors to machines and sends sensor readings into a management system by connecting to 2 different APIs. Dashboard shows live readings and warnings. Sensor page maps sensors to assets and sets thresholds.'}
        />
      </motion.section>
      <motion.section
        ref={ref2}
        key={lang + '-2'}
        id="featured-section-2"
        className="new-featured animated-featured mobile-featured-group"
        initial="hidden"
        animate={isInView2 ? "visible" : "hidden"}
        variants={featuredVariants}
      >
        <div className="featured-grid">
          {secondGroup.map((proj, idx) => {
            const isHugbotvo = proj.title.includes('Læralærlær');
            const isMiddleware = proj.title.includes('Middleware');
            return (
              <motion.a
                key={proj.title}
                className={`featured-card${isHugbotvo ? ' hugbotvo-card' : ''}${isMiddleware ? ' middleware-card' : ''}`}
                href={proj.onClick ? undefined : proj.link}
                target={proj.link && proj.link.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                variants={cardVariants}
                animate={isInView2 ? "visible" : "hidden"}
                initial="hidden"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #6c7a9255' }}
                style={{ textDecoration: 'none', cursor: proj.onClick ? 'pointer' : 'pointer' }}
                onClick={proj.onClick ? (e) => { e.preventDefault(); proj.onClick(); } : undefined}
              >
                <motion.div
                  className={`featured-image${isHugbotvo ? ' hugbotvo-image' : ''}${isMiddleware ? ' middleware-image' : ''}`}
                  style={{ backgroundImage: `url(${proj.image})` }}
                  variants={imageVariants}
                  animate={isInView2 ? "visible" : "hidden"}
                  initial="hidden"
                />
                <motion.div className="featured-description" variants={descVariants} animate={isInView2 ? "visible" : "hidden"} initial="hidden" style={isHugbotvo || isMiddleware ? { marginTop: '1.1rem', textAlign: 'center' } : {}}>
                  <h3 style={{ color: '#23305a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>{proj.title}</h3>
                  <p style={{ color: '#23305a', marginBottom: '0.5rem', fontSize: '0.98rem', textAlign: 'center' }}>{proj.desc}</p>
                  <span className="featured-linktype" style={{ color: '#1a223a', fontSize: '0.95rem', fontWeight: 500 }}>{proj.linkType}</span>
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </motion.section>
    </>
  );
};

export default AnimatedFeatured;
