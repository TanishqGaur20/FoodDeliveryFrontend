import React from 'react';
import './AboutDeveloper.css';

const AboutDeveloper = () => {
    return (
        <div className='fullAboutDev'>
            <div className="about-developer-container">
                <h2>👨‍💻 About the Developer 🍔</h2>
                <p>
                    Hi, I’m <strong>Tanishq Gaur</strong>, a passionate full-stack developer with a keen interest in creating web applications that offer seamless user experiences. My recent project, this <strong>food delivery website</strong>, is a testament to my commitment to combining functionality, performance, and design into one cohesive platform.
                </p>

                <h3>My Role in the Project:</h3>
                <p>
                    As the sole developer behind this project, I took on the challenge of building a comprehensive food delivery platform from the ground up. Here's a glimpse into my responsibilities and the technologies I used:
                </p>

                <h4>Frontend Development:</h4>
                <ul>
                    <li><strong>React.js:</strong> Utilized to create a dynamic and responsive user interface with components and hooks, ensuring the website is fast and easy to maintain.</li>
                    <li><strong>GSAP Animations:</strong> Integrated for smooth animations, making interactions more engaging and visually appealing.</li>
                    <li><strong>Responsive Design:</strong> Focused on creating a fully responsive design that adapts seamlessly to various devices.</li>
                </ul>

                <h4>Backend Development:</h4>
                <ul>
                    <li><strong>Node.js & Express.js:</strong> Powered the backend, providing a robust and scalable foundation for handling user requests and processing orders.</li>
                    <li><strong>Nodemailer Integration:</strong> Implemented for email-based OTP verification and real-time order notifications.</li>
                    <li><strong>MongoDB:</strong> Used as the database solution to manage user data, menu items, and orders efficiently.</li>
                </ul>

                <h4>Admin Panel:</h4>
                <p>
                    Developed a dedicated admin panel that enables site administrators to easily manage menu items, track and respond to orders, and oversee user activities.
                </p>

                <h4>Deployment:</h4>
                <p>
                    The website is deployed on <strong>Render.com</strong>, providing a reliable and scalable environment for hosting the application.
                </p>

                <h4>Challenges Overcome:</h4>
                <ul>
                    <li><strong>Complex User Workflows:</strong> Balanced ease of use with complex functionalities like dynamic cart management, real-time tracking, and OTP-based authentication.</li>
                    <li><strong>Performance Optimization:</strong> Ensured fast load times and smooth animations across all devices by optimizing assets and code.</li>
                </ul>

                <h4>What’s Next?</h4>
                <p>
                    I’m continually looking to improve and expand the platform, adding new features, refining the user experience, and exploring new technologies. This project has been a significant step in my journey as a developer, and I’m excited about the challenges and opportunities ahead.
                </p>
            </div>
        </div>
    );
};

export default AboutDeveloper;
