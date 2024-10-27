// src/components/Footer/Footer.tsx
import React from 'react';
import './Footer.css'
const Footer: React.FC = () => {
    return (
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>We are passionate gamers dedicated to connecting players and gamers worldwide.</p>
            </div>
            <div className="footer-section">
                <h3>Contact</h3>
                <ul>
                    <li>Email: nguyentruongbg2002.com</li>
                    <li>Phone: +123 456 789</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Follow Us</h3>
                <ul className="social-links">
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ConnectPlay. All Rights Reserved.</p>
        </div>
    </footer>
    );
};

export default Footer;
