import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../assets/PageNotFound.json'; // your Lottie file
import "./PageNotFound.css"
const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-animation">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-text">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="notfound-buttons">
        <Link to="/" className="btn home-btn">
          Return home
        </Link>
        <Link to="/contact" className="btn contact-btn">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
