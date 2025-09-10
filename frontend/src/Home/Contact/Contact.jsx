import React, { useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import '../Contact/Contact.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const HomeContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false); // Track sending state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send form data to backend
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts`,
        formData
      );

      toast.success('Your enquiry is submitted successfully!');

      // Reset form after success
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to submit enquiry. Try again!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="contact-container">
      <div className="contact-info">
        <h2 className="contact-title">We’re Here for You</h2>
        <hr className="title-underline" />

        <div className="enquiry-section">
          <h3>For Service Enquiry </h3>
          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-circle">
                <FaPhone className="phone-icon" />
              </div>
              <span>+91 5661238596</span>
            </div>
            <div className="contact-item">
              <div className="icon-circle">
                <FaEnvelope className="email-icon" />
              </div>
              <span>info@pravidya.com</span>
            </div>
          </div>
        </div>

        <div className="team-section">
          <hr className="section-underline" />
          <h3>To Join Our Team </h3>
          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-circle">
                <FaPhone className="phone-icon" />
              </div>
              <span>+91 9384735572</span>
            </div>
            <div className="contact-item">
              <div className="icon-circle">
                <FaEnvelope className="email-icon" />
              </div>
              <span>support@pravidya.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quote-form">
        <h2>Get in touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
            ></textarea>
          </div>
          <button className="send-enquiry" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeContact;
