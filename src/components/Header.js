import React from 'react';
import { FaGithub, FaHome, FaMusic, FaSoundcloud, FaUser } from 'react-icons/fa';

function Header() {
    return (
        <header className="App-header">
            <nav>
                <ul>
                    <li><a href="/"><FaHome /></a></li>
                    <li><a href="/music"><FaMusic /></a></li>
                    <li><a href="/bio"><FaUser /></a></li>
                </ul>
            </nav>
            <div>
                <a href="https://github.com/brynjarmbje"><FaGithub /></a>
                <a href="https://soundcloud.com/brynjar-mar-bjornsson"><FaSoundcloud /></a>
            </div>
        </header>
    );
}

export default Header;