  import React, { useState } from 'react';
  import { toast } from 'react-hot-toast';
  import "../TeacherStyles/CreateStudentAccount .css"
  const CreateStudentAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const token = localStorage.getItem('collegeToken');
        console.log('Token sent:', token); // Debug token value

        const res = await fetch(`${BASE_URL}/api/students/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log('Response data:', data); // Debug response

        if (res.ok && data.success) {
          toast.success('Student account created!');
          setName('');
          setEmail('');
          setPassword('');
        } else {
          toast.error(data.message || 'Failed to create student account');
        }
      } catch (error) {
        toast.error('Server error, try again later!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    return (
      <form className="student-account-form" onSubmit={handleSubmit}>
        <h2>Create Student Account</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Student name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Student email"
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
            placeholder="Password"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Student Account'}
        </button>
      </form>
    );
  };

  export default CreateStudentAccount;
