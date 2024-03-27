import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../examples/ex.css';

const MenuComponent = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="container">
            <h1>
                <button onClick={toggleMenu}>Click me</button>
            </h1>
            {menuVisible && (
                <div className="popover" id="menu">
                    <div className='content'>
                        <button onClick={toggleMenu} className="close">Close</button>
                        <nav className='nav'>
                            <ul className='nav_list'>
                                {/* Replace href with to */}
                                <li className='nav_list_item'><Link to="/" onClick={toggleMenu}>Home</Link></li>
                                <li className='nav_list_item'><Link to="/about" onClick={toggleMenu}>About</Link></li>
                                <li className='nav_list_item'><Link to="/products" onClick={toggleMenu}>Products</Link></li>
                                <li className='nav_list_item'><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                                <li className='nav_list_item'><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuComponent;