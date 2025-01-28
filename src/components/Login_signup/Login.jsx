import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import '../Login_signup/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
        is_admin: isAdmin,
      });

      if (response.status === 200) {
        const { token, redirect } = response.data;

        // Save token and update auth state
        login(token);

        // Redirect based on user type
        if (redirect === '/admin') {
          navigate('/admin');
        } else if (redirect === '/home') {
          navigate('/');
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Phone (or Username for Admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          name= "username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
        />
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            name="admin"
          />
          Login as Admin
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      {/* Register link remains here */}
      <p className="register-link">
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
