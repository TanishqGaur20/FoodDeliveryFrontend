import React from 'react';
import './Footer.css';

const Footer = () => {

    function scrolltop() {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        })
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h2>[Your Cafe's Name]</h2>
                    <p>
                        Experience the taste of home at [Your Cafe's Name], where every meal is crafted with love and care. Whether you're dining in or enjoying our food at home, we're here to serve you.
                    </p>
                    <div className="footer-socials">
                        <a href="https://tanishqgaur20.github.io/TANISHQ_PORTFOLIO_/" target='_blank' className="social-link"><i class="fa-solid fa-user-tie"></i></a>
                        <a href="https://www.instagram.com/_.tanishq.gaur._/" target='_blank' className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/tanishq-gaur-14530a251/" target='_blank' className="social-link"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#menu">Menu</a></li>
                        {/* <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#about">About Us</a></li> */}
                    </ul>
                </div>

            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 [Your Cafe's Name] | Designed by Tanishq Gaur</p>
                <i class="fa-solid fa-bolt scrollY" onClick={scrolltop}></i>
            </div>
        </footer>
    );
};

export default Footer;
