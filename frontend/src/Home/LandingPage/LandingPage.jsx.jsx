import React from 'react';
import './LandingPage.css';
import landingImage from '../../assets/withtouBGLandingImage.png';

const LandingPage = () => {
  return (
    <section className="landing-hero">
      <div className="landing-content">
        <p className="landing-subtitle">
          Empowering Young Minds, Unlocking New Horizons
        </p>
        <p className="landing-description">
          A digital learning platform designed to inspire and guide rural
          students towards knowledge, growth, and new opportunities. Learn,
          explore, and achieve.
        </p>
        <div className="landing-buttons">
          <button className="btn primary-btn">Start Learning</button>
          <button className="btn secondary-btn">Explore More</button>
        </div>
      </div>
      <div className="landing-image">
        <img draggable='false' src={landingImage} alt="Digital Learning" />
      </div>
    </section>
  );
};

export default LandingPage;
