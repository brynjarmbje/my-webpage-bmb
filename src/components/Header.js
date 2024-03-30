import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaMusic, FaSoundcloud, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import logo from '../images/bmb-logo5.png';

function Header() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const menuRef = useRef(); // Ref for the menu

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsNavVisible(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="App-header">
            <h3>Brynjar Mar</h3>
            <NavLink to="/" end>
                <img src={logo} alt="Logo" className='nav-logo' />
            </NavLink>
            <div className="hamburger" onClick={toggleNav}>
                <div className={`icon ${isNavVisible ? 'open' : ''}`}></div>
            </div>
            {isNavVisible && (
                <nav ref={menuRef} className="mobile-nav">
                    <ul>
                        <li><NavLink to="/music" onClick={() => setIsNavVisible(false)}><FaMusic /> Music</NavLink></li>
                        <li><NavLink to="/bio" onClick={() => setIsNavVisible(false)}><FaUser /> Bio</NavLink></li>
                        <li><a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaGithub /> GitHub</a></li>
                        <li><a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer" onClick={() => setIsNavVisible(false)}><FaSoundcloud /> SoundCloud</a></li>
                    </ul>
                </nav>
            )}
            
        </header>
    );
}

export default Header;