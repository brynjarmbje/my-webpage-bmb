import React from 'react';
import { useLanguage } from '../LanguageContext';
import { FaGithub, FaLinkedin, FaSoundcloud, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../styles/NewHomePage.css';

const links = [
  {
    href: 'https://github.com/brynjarmbje',
    icon: <FaGithub size={32} />, label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/brynjarmb',
    icon: <FaLinkedin size={32} />, label: 'LinkedIn',
  },
  {
    href: 'https://soundcloud.com/brynjar-mar-bjornsson',
    icon: <FaSoundcloud size={32} />, label: 'SoundCloud',
  },
];

const phone = '+354 847 5643';
const email = 'brynjarbmb@gmail.com';

const SnapFooter = () => {
  const { lang } = useLanguage();
  const getInTouch = lang === 'is' ? 'Hafðu samband' : 'Get in Touch';
  return (
    <section className="snap-footer new-contact" id="snap-footer">
      <div className="footer-content">
        <h2 className="footer-title">{getInTouch}</h2>
        <div className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-icon-btn" aria-label={l.label}>
              {l.icon}
            </a>
          ))}
        </div>
        <div className="footer-contact-btns">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="footer-contact-btn"
            aria-label={lang === 'is' ? 'Hringja í Brynjar' : 'Call Brynjar'}
          >
            <FaPhoneAlt size={22} /> <span>{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="footer-contact-btn"
            aria-label={lang === 'is' ? 'Senda Brynjari tölvupóst' : 'Email Brynjar'}
          >
            <FaEnvelope size={22} /> <span>{email}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SnapFooter;
