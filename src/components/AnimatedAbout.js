import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';


const aboutVariants = {
  hidden: { opacity: 0, x: -80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, delay: 0.3, ease: [0.39,0.575,0.565,1] } }
};
const titleVariants = {
  hidden: { opacity: 0, scale: 0.7, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
};
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.7 } }
};



const AnimatedAbout = () => {
  const { lang } = useLanguage();

  const bios = {
    is: (
      <>
        <p style={{ margin: '0.3rem 0 0.7rem 0' }}>
          Ég er tölvunarfræðingur með fjölbreytta reynslu úr hugbúnaðarþróun, samþættingu kerfa og gagnaúrvinnslu. Ég hef tekið þátt í verkefnum þar sem ég hef hannað og útfært lausnir fyrir gagnasöfnun, skýrslugerð og sjálfvirkni, bæði fyrir heilbrigðis- og þjónustugeirann.<br/>
          Ég legg áherslu á lausnamiðaða hugsun, nákvæmni og að miðla flóknum upplýsingum á skýran hátt. Ég hef góða reynslu af því að vinna bæði sjálfstætt og í teymi, og nýt þess að tileinka mér nýja tækni þegar tækifæri gefst.<br/>
          Auk tækniáhuga hef ég lokið BA-prófi í tónsmíðum og hef reynslu af tónlistargerð fyrir fjölmiðla og kvikmyndir, sem styrkir skapandi nálgun í vinnu minni.
        </p>
      </>
    ),
    en: (
      <>
        <p style={{ margin: '0.3rem 0 0.2rem 0' }}>
          I am a computer scientist with diverse experience in software development, systems integration, and data processing. I have worked on projects involving solution design and implementation for data collection, reporting, and automation, both in healthcare and service sectors.<br/>
          My approach is solution-driven and precise, and I excel at communicating complex information in a clear way. I am comfortable working both independently and as part of a team, and I enjoy learning new technologies whenever the opportunity arises.<br/>
          Alongside my technical background, I hold a BA in music composition and have composed music for media and film, which adds a creative dimension to my work.
        </p>
      </>
    )
  };

  const titles = { is: 'Um Mig', en: 'About Me' };
  return (
    <motion.section className="new-about animated-about" initial="hidden" animate="visible" variants={aboutVariants}>
      <motion.h2 className="animated-section-title" variants={titleVariants}>{titles[lang]}</motion.h2>
      <motion.div className="animated-section-text" variants={textVariants} style={{ marginBottom: '1.2rem' }}>
        {bios[lang]}
      </motion.div>
    </motion.section>
  );
};

export default AnimatedAbout;
