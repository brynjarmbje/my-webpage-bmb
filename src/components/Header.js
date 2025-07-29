import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { FaGithub, FaSoundcloud, FaLinkedin, FaGamepad } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import { ReactComponent as IcelandFlag } from '../images/iceland-flag.svg';
import { ReactComponent as USFlag } from '../images/us-flag.svg';

function Header({ isMyllaPage }) {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const menuRef = useRef(null); // Ref for the menu
    const [isNeon, setIsNeon] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['greenyellow', 'cyan', 'magenta', 'blue', 'red'];
    const [isSwitched, setIsSwitched] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);  // New state for flipping

    const toggleEffects = () => {
        setIsNeon(!isNeon);
        setColorIndex((colorIndex + 1) % colors.length); // Cycle through colors
        updateFilterColor(colors[colorIndex]); // Update the SVG filter color
        setIsSwitched(!isSwitched);
        setIsFlipped(!isFlipped);  // Toggle flipping
        setTimeout(() => {
            setIsFlipped(false); // Reset flip to original after animation
        }, 1000);  // Assuming the duration of the flip is 1 second
    };

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
            <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <NavLink to="/" end className="logo-link" onClick={toggleEffects}>
            <div className={`bmb ${isNeon ? 'neon-effect' : ''} ${isSwitched ? 'switch-positions' : ''}`}>
                <div className="b"></div>
                <div className={`m ${isFlipped ? 'flip-effect' : ''}`}></div>
                <div className="b"></div>
            </div>
        </NavLink>
        {/* Language Toggle - modern flag icon buttons */}
        <div className="lang-toggle-header">
          <button
            onClick={() => setLang('is')}
            aria-label="Icelandic"
            className={`lang-btn${lang === 'is' ? ' active' : ''}`}
          >
            <IcelandFlag style={{ width: 24, height: 24, borderRadius: '50%', filter: lang === 'is' ? 'drop-shadow(0 0 4px #ffe082)' : 'none' }} />
          </button>
          <button
            onClick={() => setLang('en')}
            aria-label="English"
            className={`lang-btn${lang === 'en' ? ' active' : ''}`}
          >
            <USFlag style={{ width: 24, height: 24, borderRadius: '50%', filter: lang === 'en' ? 'drop-shadow(0 0 4px #ffe082)' : 'none' }} />
          </button>
        </div>
            <div className="hamburger" onClick={toggleNav}>
                    <div className={`icon ${isNavVisible ? 'open' : ''}`}></div>
                </div>
            </div>
            {isNavVisible && (
                <nav ref={menuRef} className={`mobile-nav ${isNavVisible ? 'open' : ''}`}>
                    <ul>
                        <li><NavLink to="/" onClick={() => setIsNavVisible(false)}>Home</NavLink></li>
                        <li><NavLink to="/new-home" onClick={() => setIsNavVisible(false)}>New Home (Preview)</NavLink></li>
                        <li><NavLink to="/music" onClick={() => setIsNavVisible(false)}>Music</NavLink></li>
                        <li><NavLink to="/music-compositions" onClick={() => setIsNavVisible(false)}>Music CV</NavLink></li>
                        <li><NavLink to="/bio" onClick={() => setIsNavVisible(false)}>Bio</NavLink></li>
                        <li className='myllaLink'><NavLink to="/mylla" onClick={() => setIsNavVisible(false)}><FaGamepad /> Mylla</NavLink></li>
                        <li className='line'></li>
                        <li><a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaGithub /> GitHub</a></li>
                        <li><a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaSoundcloud /> SoundCloud</a></li>
                        <li><a href="https://linkedin.com/in/brynjarmb" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaLinkedin /> Linkedin</a></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};
const updateFilterColor = (color) => {
    const flood = document.getElementById('glow-color');
    if (flood) {
        flood.setAttribute('flood-color', color);
    }
};

export default Header;