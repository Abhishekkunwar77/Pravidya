import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/Navbar.css';
import logo from '../assets/PravidyaLogo.png';
import CollegeAuthForm from './CollegeAuthForm';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate(); // Initialize useNavigate

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        isMobile &&
        !e.target.closest('.navbar-links') &&
        !e.target.closest('.menu-toggle')
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, isMobile]);

  // Handle contact link click
  const handleContactClick = (e) => {
    e.preventDefault();
    if (isMobile) setOpen(false);

    if (window.location.pathname !== '/') {
      // Navigate to home with state to scroll to contact
      navigate('/', { state: { scrollTo: 'contact' } });
    } else {
      // Already on homepage, scroll to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </a>

        <div className={`navbar-links ${open ? 'active' : ''}`}>
          <a href="/" onClick={() => isMobile && setOpen(false)}>
            Home
          </a>
          <a href="/about-us" onClick={() => isMobile && setOpen(false)}>
            About
          </a>
          <a href="/courses" onClick={() => isMobile && setOpen(false)}>
            Courses
          </a>
          <a href="/quizzes" onClick={() => isMobile && setOpen(false)}>
            Quizzes
          </a>
          <a href="/blogs" onClick={() => isMobile && setOpen(false)}>
            Blogs
          </a>
          <a href="#contact" onClick={handleContactClick}>
            Contact
          </a>
          <button
            className="get-started-btn"
            onClick={() => {
              setAuthPopup(true);
              if (isMobile) setOpen(false);
            }}
          >
            Get Started
          </button>
        </div>

        <button
          className={`navbar-menu-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {authPopup && (
        <div className="navbar-auth-popup-overlay" onClick={() => setAuthPopup(false)}>
          <div
            className="navbar-auth-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <CollegeAuthForm onClose={() => setAuthPopup(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
