import React, { useState } from 'react';
import '../Styles/Navbar.css';
import logo from '../assets/PravidyaLogo.png';
import CollegeAuthForm from './CollegeAuthForm';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </a>

        <div className={`navbar-links ${open ? 'active' : ''}`}>
          <a href="/">Home</a>
          <a href="/about-us">About</a>
          <a href="/contact">Courses</a>
          <a href="/contact">Quizzes</a>
          <a href="/contact">Blogs</a>
          <a href="/contact">Contact</a>
          <button
            className="get-started-btn"
            onClick={() => setAuthPopup(true)}
          >
            Get Started
          </button>
        </div>

        <button
          className={`menu-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Popup Overlay */}
      {authPopup && (
        <div className="auth-popup-overlay" onClick={() => setAuthPopup(false)}>
          <div
            className="auth-popup-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <CollegeAuthForm onClose={() => setAuthPopup(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
