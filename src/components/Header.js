import React from 'react';
import { FaGithub, FaMusic, FaSoundcloud, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import logo from '../images/bmb-logo5.png';

function Header() {
    return (
        <header className="App-header">
            <nav className="nav-container">
                {/* Left-aligned links */}
                <div className="nav-links">
                    <ul>
                        <li><NavLink to="/" end><img src={logo} alt="Logo" className='nav-logo' />Heim</NavLink></li>
                        <li><NavLink to="/music"><FaMusic /> Tónlist</NavLink></li>
                        <li><NavLink to="/bio"><FaUser /> Um mig</NavLink></li>
                    </ul>
                </div>


                {/* Right-aligned links */}
                <div className="social-links">
                    <a href="https://github.com/brynjarmbje" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://soundcloud.com/brynjar-mar-bjornsson" target="_blank" rel="noopener noreferrer"><FaSoundcloud /></a>
                </div>
            </nav>
        </header>
    );
}

export default Header;