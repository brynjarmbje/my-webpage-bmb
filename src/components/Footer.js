import React from 'react';
import { FaGithub, FaSoundcloud } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

function Footer() {
    return (
        <footer>
            <h2>Brynjar Mar Bjornsson</h2>
            <p>Music Composer, Developer, Web Specialist, Pianist</p>
            <p><MdPhone /> 8475643</p>
            <p><MdEmail /> <a href="mailto:brynjarbmb@gmail.com">brynjarbmb@gmail.com</a></p>
            <p><FaGithub /> <a href="https://github.com/brynjarmbje">GitHub</a></p>
            <p><FaSoundcloud /> <a href="https://soundcloud.com/brynjar-mar-bjornsson">SoundCloud</a></p>
        </footer>
    );
}

export default Footer;