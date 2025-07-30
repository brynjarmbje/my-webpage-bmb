import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  // 4 projects: Mylla (site), Portfolio (site), Placeholder1 (GitHub), Placeholder2 (Live)
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
      title: lang === 'is' ? 'Hugbotvo – Málörvun' : 'Hugbotvo – Language Games',
      desc: lang === 'is'
        ? 'Kotlin Android + Jetpack. App til að kenna börnum málörvun með fjölbreyttum mini-leikjum.'
        : 'Kotlin Android + Jetpack + Navigation. App for teaching children language skills through various mini-games.',
      image: require('../images/laeralaerlaer.jpg'),
      link: 'https://github.com/brynjarmbje/hugbotvo-frontend-kotlin',
      linkType: lang === 'is' ? 'GitHub' : 'GitHub',
      onClick: null,
    },
  ];
  return (
    <motion.section
      key={lang}
      id="featured-section"
      className="new-featured animated-featured"
      initial="hidden"
      animate="visible"
      variants={featuredVariants}
    >
      <motion.h2 className="animated-section-title" variants={cardVariants}>
        {lang === 'is' ? 'Valin Verkefni' : 'Featured Projects'}
      </motion.h2>
      <div className="featured-grid">
        {projects.map((proj, idx) => {
          // Special layout for Hugbotvo card (last card)
          const isHugbotvo = proj.title.includes('Hugbotvo');
          return (
            <motion.a
              key={proj.title}
              className={`featured-card${isHugbotvo ? ' hugbotvo-card' : ''}`}
              href={proj.onClick ? undefined : proj.link}
              target={proj.link && proj.link.startsWith('/') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #6c7a9255' }}
              style={{ textDecoration: 'none', cursor: proj.onClick ? 'pointer' : 'pointer' }}
              onClick={proj.onClick ? (e) => { e.preventDefault(); proj.onClick(); } : undefined}
            >
              <motion.div
                className={`featured-image${isHugbotvo ? ' hugbotvo-image' : ''}`}
                style={isHugbotvo
                  ? { backgroundImage: `url(${proj.image})`, width: '110px', height: '220px', margin: '0 auto', borderRadius: '1.1rem', boxShadow: '0 2px 16px 0 #6c7a9244, 0 1px 8px 0 #1a223a22', backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { backgroundImage: `url(${proj.image})` }
                }
                variants={imageVariants}
              />
              <motion.div className="featured-description" variants={descVariants} style={isHugbotvo ? { marginTop: '1.1rem', textAlign: 'center' } : {}}>
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
  );
};

export default AnimatedFeatured;
