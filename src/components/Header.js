import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaMusic, FaSoundcloud, FaUser, FaHome, FaLinkedin, FaGamepad } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';

function Header() {
    const [headerHeight, setHeaderHeight] = useState(300); // Initial header height
    const [isNavVisible, setIsNavVisible] = useState(false);
    const menuRef = useRef(null); // Ref for the menu

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;
      
        const handleScroll = () => {
          lastScrollY = window.scrollY;
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const newHeight = Math.max(100, 300 - lastScrollY); // Adjusting minimum height as needed
              setHeaderHeight(newHeight);
              ticking = false;
            });
            ticking = true;
          }
        };
      
        window.addEventListener('scroll', handleScroll, { passive: true });
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

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

    useEffect(() => {
        const handleScroll = () => {
            const headerBottom = headerHeight - window.scrollY; // Calculate the current bottom position of the header
            const burgerIconBottom = 0; // Example: 20px from top + 48px height
            let navTopPosition;
    
            if (headerBottom <= burgerIconBottom) {
                // When the header bottom is above or at the burger icon bottom,
                // position the nav relative to the viewport to make it stick.
                navTopPosition = `${burgerIconBottom}px`;
            } else {
                // Otherwise, align the top of the nav with the bottom of the header.
                navTopPosition = `${headerHeight}px`;
            }
    
            if (menuRef.current) {
                menuRef.current.style.top = navTopPosition;
            }
        };
    
        // This effect depends on headerHeight.
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call it to set initial position
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [headerHeight]);

    return (
        <header className="App-header">
            <div className="header-content">
                <NavLink to="/" end className="logo-link">
                    <div className='bmb'>
                        <div className="b"></div>
                        <div className="m"></div>
                        <div className="b"></div>
                    </div>
                </NavLink>
                <div className="hamburger" onClick={toggleNav}>
                    <div className={`icon ${isNavVisible ? 'open' : ''}`}></div>
                </div>
            </div>
            {isNavVisible && (
                <nav ref={menuRef} className={`mobile-nav ${isNavVisible ? 'open' : ''}`}>
                    <ul>
                        <li><NavLink to="/" onClick={() => setIsNavVisible(false)}><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/music" onClick={() => setIsNavVisible(false)}><FaMusic /> Music</NavLink></li>
                        <li><NavLink to="/bio" onClick={() => setIsNavVisible(false)}><FaUser /> Bio</NavLink></li>
                        <li><a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaGithub /> GitHub</a></li>
                        <li><a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaSoundcloud /> SoundCloud</a></li>
                        <li><a href="https://linkedin.com/in/brynjarmb" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaLinkedin /> Linkedin</a></li>
                        <li><NavLink to="/mylla" onClick={() => setIsNavVisible(false)}><FaGamepad />Mylla</NavLink></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;