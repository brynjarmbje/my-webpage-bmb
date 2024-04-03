import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function AuthManager({ onUserAuthenticated }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? <Login onLoginSuccess={onUserAuthenticated} /> : <Signup onSignupSuccess={onUserAuthenticated} />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
    </div>
  );
}