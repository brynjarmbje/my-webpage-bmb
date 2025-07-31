
import '../styles/footer.css';
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { MdEmail, MdPhone } from 'react-icons/md';



function Footer() {
    const { lang } = useLanguage();
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const title = lang === 'en' ? 'Music Composer, Programmer' : 'Tónskáld, Forritari';

    return (
        <footer ref={ref} className={`footer-prominent${visible ? ' footer-animate-in' : ''}`}>
            <div className="footer-title">{title}</div>
            {lang === 'en' && <div className="footer-get-in-touch">Get in touch</div>}
            {lang === 'is' && <div className="footer-get-in-touch">Hafðu samband</div>}
            <div className="footer-contact-btns">
                <a
                    href="tel:+3548475643"
                    className="footer-btn phone"
                    aria-label={lang === 'en' ? 'Call Brynjar' : 'Hringja í Brynjar'}
                >
                    <span className="footer-btn-icon">
                        <MdPhone size={32} />
                    </span>
                    <span className="footer-btn-text">847-5643</span>
                </a>
                <a
                    href="mailto:brynjarbmb@gmail.com"
                    className="footer-btn email"
                    aria-label={lang === 'en' ? 'Email Brynjar' : 'Senda Brynjari tölvupóst'}
                >
                    <span className="footer-btn-icon">
                        <MdEmail size={32} />
                    </span>
                    <span className="footer-btn-text">brynjarbmb@gmail.com</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;