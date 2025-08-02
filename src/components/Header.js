import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { FaGithub, FaSoundcloud, FaLinkedin, FaGamepad, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import { ReactComponent as IcelandFlag } from '../images/iceland-flag.svg';
import { ReactComponent as USFlag } from '../images/us-flag.svg';
import { useTheme } from '../ThemeContext';
import 'react-toggle/style.css';

function Header({ isMyllaPage, hideLogo }) {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const menuRef = useRef(null); // Ref for the menu
    // Removed BMB animated logo logic

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.matches('.hamburger, .hamburger *')) {
                setIsNavVisible(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { lang, setLang } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`App-header ${isMyllaPage ? 'mylla-header' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <filter id="neon-glow" x="-50%" y="-50%" width="250%" height="250%">
                        <feFlood id="glow-color" floodColor="greenyellow" floodOpacity="1" />
                        <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
                        <feMorphology in="mask" result="dilated" operator="dilate" radius="2" />
                        <feGaussianBlur in="dilated" result="blurred" stdDeviation="5" />
                        <feMerge>
                            <feMergeNode in="blurred" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>
            <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
              {/* Left side: theme toggle */}
              <div className="header-left-controls" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark/light mode"
                  className={`theme-toggle-switch theme-toggle-icon-btn${theme === 'dark' ? ' dark' : ' light'}`}
                >
                  <span className="theme-toggle-svg-wrapper">
                    <svg
                      className={`theme-toggle-icon${theme === 'dark' ? ' theme-moon-icon' : ' theme-sun-icon'}`}
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke={theme === 'dark' ? '#ffe082' : '#23305a'}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <g>
                        <circle
                          className="theme-sun-moon"
                          cx="12"
                          cy="12"
                          r={theme === 'dark' ? '9' : '5'}
                          fill="currentColor"
                          style={{
                            transition: 'r 0.35s cubic-bezier(.4,2,.6,1), fill 0.2s',
                          }}
                        />
                        {/* Sun rays, fade out in dark mode */}
                        <g
                          className="theme-sun-rays"
                          style={{
                            opacity: theme === 'dark' ? 0 : 1,
                            transition: 'opacity 0.35s cubic-bezier(.4,2,.6,1)',
                          }}
                        >
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                        {/* Moon crescent, fade in in dark mode */}
                        <path
                          className="theme-moon-crescent"
                          d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                          style={{
                            opacity: theme === 'dark' ? 1 : 0,
                            transition: 'opacity 0.35s cubic-bezier(.4,2,.6,1)',
                            stroke: theme === 'dark' ? '#ffe082' : '#23305a',
                          }}
                        />
                      </g>
                    </svg>
                  </span>
                </button>
                {/* BMB animated logo removed for new look */}
              </div>
              {/* Right side: language and hamburger */}
              <div className="header-fixed-controls">
                <button
                  className="lang-toggle-split"
                  aria-label="Toggle language"
                  onClick={() => setLang(lang === 'is' ? 'en' : 'is')}
                >
                  <span className={`lang-half left${lang === 'is' ? ' active' : ''}`}>
                    <IcelandFlag style={{ width: 22, height: 22, borderRadius: '50%' }} />
                  </span>
                  <span className={`lang-half right${lang === 'en' ? ' active' : ''}`}>
                    <USFlag style={{ width: 22, height: 22, borderRadius: '50%' }} />
                  </span>
                  <span className="lang-indicator" style={{ left: lang === 'is' ? 0 : '50%', pointerEvents: 'none' }} />
                </button>
                <div className="hamburger" onClick={toggleNav}>
                  <div className={`icon ${isNavVisible ? 'open' : ''}`}></div>
                </div>
              </div>
            </div>
            {isNavVisible && (
                <nav ref={menuRef} className={`mobile-nav ${isNavVisible ? 'active' : ''}`}>
                    <div className="mobile-nav-content">
                        <ul className="mobile-nav-links">
                            <li><NavLink to="/" onClick={() => setIsNavVisible(false)}>Home</NavLink></li>
                            <li><NavLink to="/music-video-cv" onClick={() => setIsNavVisible(false)}>Music Video CV</NavLink></li>
                            {/* Removed: New Home (Preview), Music, Music CV, Bio */}
                            <li className='myllaLink'><NavLink to="/mylla" onClick={() => setIsNavVisible(false)}><FaGamepad /> Mylla</NavLink></li>
                            <li className='line'></li>
                            <li><a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaGithub /> GitHub</a></li>
                            <li><a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaSoundcloud /> SoundCloud</a></li>
                            <li><a href="https://linkedin.com/in/brynjarmb" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaLinkedin /> Linkedin</a></li>
                        </ul>
                        
                        <div className="mobile-nav-contact">
                            <h3 className="mobile-nav-contact-title">{lang === 'is' ? 'Hafðu samband' : 'Get in Touch'}</h3>
                            <div className="mobile-nav-contact-buttons">
                                <a
                                    href="tel:+354 847 5643"
                                    className="mobile-nav-contact-btn"
                                    onClick={() => setIsNavVisible(false)}
                                    aria-label={lang === 'is' ? 'Hringja í Brynjar' : 'Call Brynjar'}
                                >
                                    <FaPhoneAlt size={18} /> <span>+354 847 5643</span>
                                </a>
                                <a
                                    href="mailto:brynjarbmb@gmail.com"
                                    className="mobile-nav-contact-btn"
                                    onClick={() => setIsNavVisible(false)}
                                    aria-label={lang === 'is' ? 'Senda Brynjari tölvupóst' : 'Email Brynjar'}
                                >
                                    <FaEnvelope size={18} /> <span>brynjarbmb@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;