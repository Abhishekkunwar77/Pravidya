import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageNotFound.css';
import PageNotFoundImg from '../../assets/PageNotFound.png';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } }); // scroll to contact section
  };

  return (
    <div className="pnf-container">
      <div className="pnf-image">
        <img draggable="false" src={PageNotFoundImg} alt="Page Not Found" />
      </div>
      <h1 className="pnf-title">Page Not Found</h1>
      <p className="pnf-text">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="pnf-buttons">
        {/* Keep Return Home button */}
        <Link to="/" className="pnf-btn pnf-home-btn">
          Return Home
        </Link>
        {/* Contact Us scrolls to contact section */}
        <button className="pnf-btn pnf-contact-btn" onClick={handleContactClick}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
