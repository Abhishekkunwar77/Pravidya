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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts`,
        formData
      );

      toast.success('Your enquiry is submitted successfully!');
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
    <div id="contact" className="hc-contact-container">
      <div className="hc-contact-info">
        <h2 className="hc-contact-title">We’re Here for You</h2>
        <hr className="hc-title-underline" />

        <div className="hc-enquiry-section">
          <h3>For Service Enquiry </h3>
          <div className="hc-contact-details">
            <div className="hc-contact-item">
              <div className="hc-icon-circle">
                <FaPhone className="hc-phone-icon" />
              </div>
              <span>+91 5661238596</span>
            </div>
            <div className="hc-contact-item">
              <div className="hc-icon-circle">
                <FaEnvelope className="hc-email-icon" />
              </div>
              <span>info@pravidya.com</span>
            </div>
          </div>
        </div>

        <div className="hc-team-section">
          <hr className="hc-section-underline" />
          <h3>To Join Our Team </h3>
          <div className="hc-contact-details">
            <div className="hc-contact-item">
              <div className="hc-icon-circle">
                <FaPhone className="hc-phone-icon" />
              </div>
              <span>+91 9384735572</span>
            </div>
            <div className="hc-contact-item">
              <div className="hc-icon-circle">
                <FaEnvelope className="hc-email-icon" />
              </div>
              <span>support@pravidya.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hc-quote-form">
        <h2>Get in touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="hc-form-group">
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
          <div className="hc-form-group">
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
          <div className="hc-form-group">
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
          <div className="hc-form-group">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
            ></textarea>
          </div>
          <button className="hc-send-enquiry" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeContact;
