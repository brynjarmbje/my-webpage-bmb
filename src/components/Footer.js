import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import '../styles/footer.css';

function Footer() {
    return (
        <footer>
            <p>Music Composer, Developer, Web Specialist, Pianist</p>
            <p><MdPhone /> 8475643</p>
            <p><a href="mailto:brynjarbmb@gmail.com"><MdEmail /> brynjarbmb@gmail.com</a></p>
        </footer>
    );
}

export default Footer;