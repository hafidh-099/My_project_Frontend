import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConfirmationPage.css';

function ConfirmationPage() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Call the confirmation endpoint
      const response = await axios.post('http://localhost:8000/confirm_order/', {
        phone: formData.phone,
        password: formData.password,
        food_items: JSON.parse(localStorage.getItem('cart')), // Fetch cart from localStorage
        total_price: localStorage.getItem('total_price'), // Fetch price from localStorage
      });

      if (response.status === 201) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        localStorage.removeItem('total_price');
        navigate('/'); // Redirect to the home page
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="confirmation-page">
      <h2>Confirm Your Order</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default ConfirmationPage;
