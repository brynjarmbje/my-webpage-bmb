import React, { useState } from 'react';

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
                        <div className='nav'>
                            <ul className='nav_list'>
                                <li className='nav_list_item'><a href="/">Home</a></li>
                                <li className='nav_list_item'><a href="/">About</a></li>
                                <li className='nav_list_item'><a href="/">Products</a></li>
                                <li className='nav_list_item'><a href="/">Services</a></li>
                                <li className='nav_list_item'><a href="/">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuComponent;