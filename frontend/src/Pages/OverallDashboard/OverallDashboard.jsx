import React from 'react';
import './OverallDashboard.css';
import studentLogin from '../../assets/studentLogin.jpg';
import teacherLogin from '../../assets/teacherLogin.jpg';
import adminLogin from '../../assets/adminLogin.jpg';
import principalLogin from '../../assets/principalLogin.jpg';
import parentLogin from '../../assets/parentLogin.jpg';

const OverallDashboard = () => {
  const cards = [
    {
      title: 'Student Login',
      body: 'Access student portal',
      img: studentLogin,
    },
    {
      title: 'Teacher Login',
      body: 'Manage courses & attendance',
      img: teacherLogin,
    },
    { title: 'Admin Login', body: 'Control user management', img: adminLogin },
    {
      title: 'Principal Login',
      body: 'View reports & analytics',
      img: principalLogin,
    },
    { title: 'Parent Login', body: 'Track student progress', img: parentLogin },
  ];

  return (
    <div className="overall-dashboard-container">
      {/* Heading Section */}
      <header className="dashboard-header">
        <h1>Welcome to the Pravidya Portal</h1>
        <p>Select your login type to access the system</p>
        <hr className="divider" />
      </header>

      {/* Cards Section */}
      <div className="overall-dashboard">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-image">
              <img
                draggable="false"
                src={card.img}
                alt={card.title}
                loading="lazy"
              />
            </div>
            <div className="card-details">
              <p className="text-title">{card.title}</p>
              <p className="text-body">{card.body}</p>
            </div>
            <button className="card-button">More Info</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          Need help? Contact support at{' '}
          <a href="mailto:pravidya@gmail.com" className="mail-link">
            pravidya@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default OverallDashboard;
