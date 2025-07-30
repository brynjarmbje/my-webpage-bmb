import React from 'react';
import { FaGithub, FaLinkedin, FaSoundcloud, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../styles/NewHomePage.css';

const links = [
  {
    href: 'https://github.com/brynjarmbje',
    icon: <FaGithub size={32} />, label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/brynjar-m%C3%A1r-bj%C3%B6rnsson-1b1b1b1b/',
    icon: <FaLinkedin size={32} />, label: 'LinkedIn',
  },
  {
    href: 'https://soundcloud.com/brynjar-m-bjornsson',
    icon: <FaSoundcloud size={32} />, label: 'SoundCloud',
  },
];

const phone = '+354 777 1234'; // Replace with your real phone
const email = 'brynjar@example.com'; // Replace with your real email

const SnapFooter = () => (
  <section className="snap-footer new-contact" id="snap-footer">
    <div className="footer-content">
      <h2 className="footer-title">Get in Touch</h2>
      <div className="footer-links">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-icon-btn" aria-label={l.label}>
            {l.icon}
          </a>
        ))}
      </div>
      <div className="footer-contact-btns">
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-contact-btn">
          <FaPhoneAlt size={22} /> <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`} className="footer-contact-btn">
          <FaEnvelope size={22} /> <span>{email}</span>
        </a>
      </div>
    </div>
  </section>
);

export default SnapFooter;
