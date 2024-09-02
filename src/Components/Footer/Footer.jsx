import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h2>[Your Cafe's Name]</h2>
                    <p>
                        Experience the taste of home at [Your Cafe's Name], where every meal is crafted with love and care. Whether you're dining in or enjoying our food at home, we're here to serve you.
                    </p>
                    <div className="footer-socials">
                        <a href="[Your Facebook Link]" className="social-link"><i className="fab fa-facebook-f"></i></a>
                        <a href="[Your Instagram Link]" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="[Your Twitter Link]" className="social-link"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#about">About Us</a></li>
                    </ul>
                </div>

            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 [Your Cafe's Name] | Designed by Tanishq Gaur</p>
            </div>
        </footer>
    );
};

export default Footer;
