import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Make sure this is destructuring the 'login' function from useAuth
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Pass the email and password to the login function
      setMessage('Login successful!');
      if (onLoginSuccess) {
        onLoginSuccess(); // If there is a callback, call it upon successful login
      }
    } catch (error) {
      setMessage(`Failed to log in: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;