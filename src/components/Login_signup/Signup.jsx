import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login_signup/Signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.61.212.40:8000/signup/', formData);
      console.log('User registered successfully:', response.data);
      alert('Registration successful!');
      navigate('/login'); // Navigate to the login page after successful signup
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="sign-up-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="sign-up-btn">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
