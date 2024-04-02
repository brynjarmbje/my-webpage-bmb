import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import '../styles/footer.css';

function Footer() {
    return (
        <footer>
            <p>Music Composer, Programmer</p>
            <p><a href="tel:+3548475643" style={{ textDecoration: 'none', color: 'inherit' }}><MdPhone /> 8475643</a></p>
            <p><a href="mailto:brynjarbmb@gmail.com"><MdEmail /> brynjarbmb@gmail.com</a></p>
        </footer>
    );
}

export default Footer;