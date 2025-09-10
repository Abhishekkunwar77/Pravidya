import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import './PageNotFound.css';

const PageNotFound = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/PageNotFound.json') // served directly from public/
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie JSON', err));
  }, []);

  return (
    <div className="notfound-container">
      <div className="notfound-animation">
        {animationData && <Lottie animationData={animationData} loop={true} />}
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
