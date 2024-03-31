import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaMusic, FaSoundcloud, FaUser, FaHome, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';

function Header() {
    const [headerHeight, setHeaderHeight] = useState(300); // Initial header height
    const [isNavVisible, setIsNavVisible] = useState(false);
    const menuRef = useRef(); // Ref for the menu

    useEffect(() => {
        const handleScroll = () => {
          const position = window.pageYOffset;
          const newHeight = Math.max(100, 300 - position); // Minimum height is 100px
          setHeaderHeight(newHeight);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const toggleNav = (event) => {
        if (isNavVisible) {
            event.stopPropagation();
        }
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

    return (
        <header className="App-header" style={{ height: `${headerHeight}px`, backgroundPosition: `center ${headerHeight - 300}px` }}>
            <NavLink to="/" end>
            <div className='bmb'>
                <div className="b"></div>
                <div className="m"></div>
                <div className="b"></div>
            </div>
            </NavLink>
<h3 className='noText'>bmb.</h3>
            <div className="hamburger" onClick={toggleNav}>
                <div className={`icon ${isNavVisible ? 'open' : ''}`}></div>
            </div>
            {isNavVisible && (
                <nav ref={menuRef} className="mobile-nav">
                    <ul>
                        <li><NavLink to="/" onClick={() => setIsNavVisible(false)}><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/music" onClick={() => setIsNavVisible(false)}><FaMusic /> Music</NavLink></li>
                        <li><NavLink to="/bio" onClick={() => setIsNavVisible(false)}><FaUser /> Bio</NavLink></li>
                        <li><a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaGithub /> GitHub</a></li>
                        <li><a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaSoundcloud /> SoundCloud</a></li>
                        <li><a href="https://linkedin.com/in/brynjarmb" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaLinkedin /> Linkedin</a></li>

                    </ul>
                </nav>
            )}
            
        </header>
    );
}

export default Header;