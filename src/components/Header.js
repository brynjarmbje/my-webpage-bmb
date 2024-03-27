import React from 'react';

function Header() {
    return (
        <header className="App-header">
            <nav>
                <ul>
                    <li><a href="#music">Music</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <h1>Welcome to My Music App</h1>
        </header>
    );
}

export default Header;