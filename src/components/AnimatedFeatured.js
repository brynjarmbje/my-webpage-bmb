import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

import ProjectModal from './ProjectModal';

import dashImg from '../images/Fiix-Neuron_Dash.jpeg';
import sensImg from '../images/Fiix-Neuron_Sens.jpeg';
import frumaMain from '../images/Fruma_Main-screen.png';
import frumaLogin from '../images/Fruma_Log-in.png';


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
  // modalOpen: false | 'middleware' | 'fruma'
  // modalOpen: false | 'middleware' | 'fruma'
  const [modalOpen, setModalOpen] = useState(/** @type {false | 'middleware' | 'fruma'} */(false));
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
      title: lang === 'is' ? 'Fruma – Heilsudagbók' : 'Fruma – Health Diary',
      desc:
        lang === 'is'
          ? 'React Native, Expo, TypeScript'
          : 'React Native, Expo, TypeScript',
      image: frumaMain,
      link: '#',
      linkType: lang === 'is' ? 'Skoða' : 'View',
      onClick: () => setModalOpen('fruma'),
      extraImages: [frumaLogin],
    },
    {
      title: lang === 'is' ? 'API Middleware Forrit' : 'Industrial IoT Middleware',
      desc: 'Python, JavaScript, Flask, Watchdog',
      image: dashImg,
      link: '#',
      linkType: lang === 'is' ? 'Skoða' : 'View',
      onClick: () => setModalOpen('middleware'),
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <>
      <motion.section
        ref={ref}
        key={lang}
        id="featured-section"
        className="new-featured animated-featured"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={featuredVariants}
      >
        <motion.h2 className="animated-section-title" variants={cardVariants} animate={isInView ? "visible" : "hidden"} initial="hidden">
          {lang === 'is' ? 'Verkefni' : 'Projects'}
        </motion.h2>
        <div className="featured-grid-2x2">
          {projects.map((proj, idx) => {
            const isHugbotvo = proj.title.includes('Læralærlær');
            const isMiddleware = proj.title.includes('Middleware');
            const isFruma = proj.title.includes('Fruma');
            return (
              <motion.a
                key={proj.title}
                className={`featured-card${isHugbotvo ? ' hugbotvo-card' : ''}${isMiddleware ? ' middleware-card' : ''}${isFruma ? ' hugbotvo-card' : ''}`}
                href={proj.onClick ? undefined : proj.link}
                target={proj.link && proj.link.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                variants={cardVariants}
                animate={isInView ? "visible" : "hidden"}
                initial="hidden"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #6c7a9255' }}
                style={{ 
                  textDecoration: 'none', 
                  cursor: proj.onClick ? 'pointer' : 'pointer',
                  animationDelay: `${idx * 0.15}s`
                }}
                onClick={proj.onClick ? (e) => { e.preventDefault(); proj.onClick(); } : undefined}
              >
                <motion.div
                  className={`featured-image${isHugbotvo ? ' hugbotvo-image' : ''}${isMiddleware ? ' middleware-image' : ''}${isFruma ? ' fruma-image' : ''}`}
                  style={{ backgroundImage: `url(${proj.image})` }}
                  variants={imageVariants}
                  animate={isInView ? "visible" : "hidden"}
                  initial="hidden"
                />
                <motion.div className="featured-description" variants={descVariants} animate={isInView ? "visible" : "hidden"} initial="hidden" style={isHugbotvo || isMiddleware || isFruma ? { marginTop: '1.1rem', textAlign: 'center' } : {}}>
                  <h3 style={{ color: '#23305a', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>{proj.title}</h3>
                  <p style={{ color: '#23305a', marginBottom: '0.5rem', fontSize: '0.98rem', textAlign: 'center' }}>{proj.desc}</p>
                  <span className="featured-linktype" style={{ color: '#1a223a', fontSize: '0.95rem', fontWeight: 500 }}>{proj.linkType}</span>
                </motion.div>
              </motion.a>
            );
          })}
        </div>
        <ProjectModal
          key={lang + '-middleware'}
          open={modalOpen === 'middleware'}
          onClose={() => setModalOpen(false)}
          dashImg={dashImg}
          sensImg={sensImg}
          dashCaption={(lang) => lang === 'is' ? 'Yfirlit: Byrjaðu að fylgjast með mæligögnum og fáðu viðvaranir' : 'Dashboard: Start monitoring sensor readings and show warnings'}
          sensCaption={(lang) => lang === 'is' ? 'Skynjarar: Kortleggja skynjara á eignir og stilla viðmiðunarmörk' : 'Sensor page: Map sensors to assets and set thresholds'}
          description={lang === 'is'
            ? 'Middleware lausn sem tengir skynjara við vélar og sendir mæligögn í stjórnunarkerfi. Skrifuð í Python og JavaScript, tengist tveimur API-um, sýnir rauntímagögn og viðvaranir.'
            : 'Middleware project (Python, JavaScript) that connects sensors to machines and sends sensor readings into a management system by connecting to 2 different APIs. Dashboard shows live readings and warnings. Sensor page maps sensors to assets and sets thresholds.'}
        />
        <ProjectModal
          key={lang + '-fruma'}
          open={modalOpen === 'fruma'}
          onClose={() => setModalOpen(false)}
          dashImg={frumaMain}
          sensImg={frumaLogin}
          dashCaption={(lang) => lang === 'is' ? 'Aðalskjár: Skráðu nýtt heilsufarsatvik eða skoðaðu söguna þína' : 'Main screen: Log a new health episode or view your history'}
          sensCaption={(lang) => lang === 'is' ? 'Innskráning: Öruggt aðgangskerfi fyrir notendur' : 'Login screen: Secure user authentication'}
          description={lang === 'is'
            ? (<span>
                Fruma er Android app skrifað í React Native/Expo og TypeScript til að skrá og fylgjast með heilsufarsatvikum, einkennum og lyfjum.<br/>
                <a href="https://github.com/brynjarmbje/fruma_mobile" target="_blank" rel="noopener noreferrer" style={{color:'#1a223a',fontWeight:600}}>GitHub</a>
              </span>)
            : (<span>
                Fruma is an Android app built with React Native/Expo and TypeScript to log and track health episodes, symptoms, and medications.<br/>
                <a href="https://github.com/brynjarmbje/fruma_mobile" target="_blank" rel="noopener noreferrer" style={{color:'#1a223a',fontWeight:600}}>GitHub</a>
              </span>)}
        />
      </motion.section>
    </>
  );
};

export default AnimatedFeatured;
