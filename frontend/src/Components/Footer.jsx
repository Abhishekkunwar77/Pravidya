import '../Styles/Footer.css';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarker,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import logoImage from '../assets/PravidyaLogo.png';

const FaWhatsapp = lazy(() =>
  import('react-icons/fa').then((mod) => ({ default: mod.FaWhatsapp }))
);

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/announcements">Announcements</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>

        {/* Learning Resources */}
        <div className="footer-column">
          <h3>Learning Resources</h3>
          <ul>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/library">Digital Library</Link>
            </li>
            <li>
              <Link to="/teachers">Teacher Resources</Link>
            </li>
            <li>
              <Link to="/student-dashboard">Student Dashboard</Link>
            </li>
            <li>
              <Link to="/quizzes">Quizzes</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support & Community</h3>
          <ul>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/support">Help & Support</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3>Contact Information</h3>
          <ul>
            <li>
              <FaMapMarker aria-hidden="true" />
              TamilNadu - 641202
            </li>
            <li>
              <FaEnvelope aria-hidden="true" />{' '}
              <a href="mailto:pravidya@gmail.com">pravidya@gmail.com</a>
            </li>
            <li>
              <FaPhone aria-hidden="true" /> Call Us : (+91) 5689451205
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-separator" />

      {/* Bottom Row */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <Link to="/">
            <img
              loading="lazy"
              draggable="false"
              src={logoImage}
              alt="Pravidya Logo"
            />
          </Link>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Pravidya. All right reserved.
        </p>
        <div className="social-icons">
          <a
            aria-label="Facebook Page"
            href="https://www.facebook.com/nishu.kunwar.31"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-wrapper">
              <FaFacebook />
            </span>
          </a>
          <a
            aria-label="Twitter Profile"
            href="https://x.com/kunwar_abh29597"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-wrapper">
              <FaTwitter />
            </span>
          </a>
          <a
            aria-label="LinkedIn Profile"
            href="https://www.linkedin.com/in/abhishek-kunwar55/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-wrapper">
              <FaLinkedin />
            </span>
          </a>
          <a
            aria-label="Instagram Profile"
            href="https://www.instagram.com/abhishek_kunwar23/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-wrapper">
              <FaInstagram />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll to top */}
      <a
        href="#"
        aria-label="Scroll to Top"
        className="scroll-to-top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <FaArrowUp />
      </a>

      {/* Lazy-loaded WhatsApp */}
      <Suspense fallback={null}>
        <a
          href="https://wa.me/7708520329"
          aria-label="WhatsApp Chat"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
      </Suspense>
    </footer>
  );
}

export default Footer;
