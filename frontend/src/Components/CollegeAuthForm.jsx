import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/CollegeAuthForm.css';
import { toast } from 'react-hot-toast';

const CollegeAuthForm = ({ onClose }) => {
  const [state, setState] = useState('login'); // "login" or "register"
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const action = state === 'login' ? 'Logging in' : 'Registering';
    const endpoint =
      state === 'login'
        ? `${BASE_URL}/api/college/login`
        : `${BASE_URL}/api/college/register`;

    const payload =
      state === 'login' ? { email, password } : { name, email, password };

    toast.loading(`${action}...`, { id: 'authToast' });

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null); // catch invalid JSON

      if (res.ok && data?.success) {
        toast.success(
          state === 'login' ? 'Logged in successfully!' : 'Account created!',
          { id: 'authToast' }
        );
        localStorage.setItem('collegeToken', data.token);
        setName('');
        setEmail('');
        setPassword('');
        onClose();

        if (state === 'login') {
          // Redirect to student account creation page after login
          navigate('/teacher-dashboard');
        }
      } else {
        toast.error(data?.message || 'Something went wrong!', {
          id: 'authToast',
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error, try again later!', { id: 'authToast' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="college-auth-form" onSubmit={handleSubmit}>
      <button type="button" className="close-popup" onClick={onClose}>
        &times;
      </button>

      <h2 className="form-title">
        {state === 'login' ? 'Academy Login' : 'Academy Sign Up'}
      </h2>

      {state === 'register' && (
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter college name"
            disabled={loading}
          />
        </div>
      )}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter official email"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
          disabled={loading}
        />
      </div>

      <p className="toggle-text">
        {state === 'register' ? (
          <>
            Already have an account?{' '}
            <span onClick={() => !loading && setState('login')}>Login</span>
          </>
        ) : (
          <>
            Create an account?{' '}
            <span onClick={() => !loading && setState('register')}>
              Sign Up
            </span>
          </>
        )}
      </p>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading
          ? state === 'login'
            ? 'Logging in...'
            : 'Registering...'
          : state === 'login'
          ? 'Login'
          : 'Create Account'}
      </button>
    </form>
  );
};

export default CollegeAuthForm;
