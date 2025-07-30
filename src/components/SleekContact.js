import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import '../styles/NewHomePage.css';

const containerVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, delay: 1.1 } }
};
const titleVariants = {
  hidden: { opacity: 0, scale: 0.7, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }
};
const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 1.3 } }
};
const btnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay: 1.4, type: 'spring', stiffness: 120 } }
};


const SleekContact = () => {
  const { lang, setLang } = useLanguage();
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [sent, setSent] = useState(false);

  const t = lang === 'is'
    ? {
        title: 'Hafa samband',
        desc: 'Ertu með verkefni, spurningu eða vilt bara segja hæ? Sendu skilaboð og ég svara eins fljótt og ég get!',
        email: 'Netfangið þitt...',
        message: 'Skrifaðu skilaboðin hér...',
        send: 'Senda',
        sent: 'Sent!',
        toggle: 'EN'
      }
    : {
        title: `Let's Connect`,
        desc: `Got a project, question, or just want to say hi? Drop a message below and I'll get back to you soon!`,
        email: 'Your email...',
        message: 'Type your message...',
        send: 'Send',
        sent: 'Sent!',
        toggle: 'IS'
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ email: '', message: '' });
  };

  return (
    <motion.section className="new-contact animated-contact sleek-contact-card" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.button
        className="new-btn secondary"
        style={{ position: 'absolute', top: 18, right: 18, fontSize: '0.98rem', padding: '0.4rem 1.1rem', zIndex: 10 }}
        onClick={() => setLang(lang === 'is' ? 'en' : 'is')}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.05 }}
        aria-label="Toggle language"
      >
        {t.toggle}
      </motion.button>
      <motion.h2 className="animated-section-title" variants={titleVariants}>
        {t.title}
      </motion.h2>
      <motion.p className="sleek-contact-desc" variants={formVariants}>
        {t.desc}
      </motion.p>
      <motion.form className="sleek-contact-form" onSubmit={handleSubmit} variants={formVariants} autoComplete="off">
        <motion.input
          type="email"
          name="email"
          placeholder={t.email}
          value={formData.email}
          onChange={handleChange}
          required
          className="sleek-input"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
        />
        <motion.textarea
          name="message"
          placeholder={t.message}
          value={formData.message}
          onChange={handleChange}
          required
          className="sleek-textarea"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.45 }}
        />
        <motion.button
          type="submit"
          className="new-btn primary sleek-send-btn"
          variants={btnVariants}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
        >
          {sent ? t.sent : t.send}
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default SleekContact;
