import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <>
            <div className="contact">
                <div className="contact-container">
                    <h2 className="contact-title">Get in Touch with [Your Cafe's Name]</h2>
                    <p className="bluep contact-intro">
                        We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, our team is here to help.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <h3>Phone:</h3>
                            <p>6350027364</p>
                            <p className='bluep'>Call us anytime during our business hours for orders or inquiries.</p>
                        </div>

                        <div className="contact-item">
                            <h3>Email:</h3>
                            <p>gaurtanishq07@gmail.com</p>
                            <p className='bluep'>Drop us an email, and we’ll get back to you as soon as possible.</p>
                        </div>

                        <div className="contact-item">
                            <h3>Address:</h3>
                            <p>15/b East Greater Noida </p>
                            <p className='bluep'>Visit us in person! We’re located at 15/b East sGreater Noida , and we can’t wait to serve you.</p>
                        </div>
                    </div>

                    <div className="business-hours">
                        <h3>Business Hours:</h3>
                        <p className='bluep'>Monday to Friday: 8:00 AM – 10:00 PM</p>
                        <p className='bluep'>Saturday to Sunday: 9:00 AM – 11:00 PM</p>
                    </div>

                    <div className="social-media">
                        <h3>Follow Us</h3>
                        <a href="[Your Facebook Link]">Facebook</a>
                        <a href="[Your Instagram Link]">Instagram</a>
                        <a href="[Your Twitter Link]">Twitter</a>
                    </div>

                    <div className="feedback-form">
                        <h3>Feedback Form</h3>
                        {/* Replace with your form or form link */}
                        <a href="https://forms.gle/ywQrvUaYG79YBYcf6">Fill out our feedback form</a>
                    </div>
                </div>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.4671712346903!2d74.30353777515275!3d24.882041577915246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396881be79c3cf11%3A0x5bb7c7052b2dfd7f!2sTanishq&#39;acs%20Home!5e0!3m2!1sen!2sin!4v1725081972768!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </>
    );
};

export default Contact;
