import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';


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
  const projects = [
    {
      title: lang === 'is' ? 'Mylla – Nútímalegur borðspilaleikur' : 'Mylla – Modern Board Game',
      desc: 'React, Firebase, Web Audio API',
      image: require('../images/mylla.png'),
      link: '/mylla',
      linkType: lang === 'is' ? 'Á vefnum' : 'On this site',
    },
    {
      title: lang === 'is' ? 'Portfolio – Vefsíða' : 'Portfolio – Website',
      desc: 'React, Framer Motion',
      image: require('../images/bmb-logo2.png'),
      link: 'https://brynjar.dev',
      linkType: lang === 'is' ? 'Á vefnum' : 'Live site',
    },
    {
      title: lang === 'is' ? 'Placeholder Verkefni 1' : 'Placeholder Project 1',
      desc: 'Node.js, Express',
      image: require('../images/bmb-logo3.png'),
      link: 'https://github.com/brynjarmbje/placeholder1',
      linkType: 'GitHub',
    },
    {
      title: lang === 'is' ? 'Placeholder Verkefni 2' : 'Placeholder Project 2',
      desc: 'Python, Flask',
      image: require('../images/bmb-logo4.png'),
      link: 'https://placeholder2.live',
      linkType: lang === 'is' ? 'Á annarri síðu' : 'Other site',
    },
  ];
  return (
    <motion.section id="featured-section" className="new-featured animated-featured" initial="hidden" animate="visible" variants={featuredVariants}>
      <motion.h2 className="animated-section-title" variants={cardVariants}>
        {lang === 'is' ? 'Valin Verkefni' : 'Featured Projects'}
      </motion.h2>
      <div className="featured-grid">
        {projects.map((proj, idx) => (
          <motion.a
            key={proj.title}
            className="featured-card"
            href={proj.link}
            target={proj.link.startsWith('/') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 24px #ffe08255' }}
            style={{ textDecoration: 'none' }}
          >
            <motion.div className="featured-image" style={{ backgroundImage: `url(${proj.image})` }} variants={imageVariants} />
            <motion.div className="featured-description" variants={descVariants}>
              <h3 style={{ color: '#ffe082', marginBottom: '0.3rem', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>{proj.title}</h3>
              <p style={{ color: '#bdbdbd', marginBottom: '0.5rem', fontSize: '0.98rem', textAlign: 'center' }}>{proj.desc}</p>
              <span className="featured-linktype" style={{ color: '#ffe082', fontSize: '0.95rem', fontWeight: 500 }}>{proj.linkType}</span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};

export default AnimatedFeatured;
