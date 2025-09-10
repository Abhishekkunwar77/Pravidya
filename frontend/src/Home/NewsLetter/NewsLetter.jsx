import { useState } from 'react';
import toast from 'react-hot-toast';
import './NewsLetter.css'; // Import CSS

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter an email');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscribers/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Subscription failed');
      } else {
        toast.success(data.message || 'Subscribed successfully!');
        setEmail('');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <h1 className="newsletter-title">Never Miss a Deal!</h1>
      <p className="newsletter-text">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="newsletter-input"
          disabled={loading}
        />
        <button type="submit" className="newsletter-button" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
