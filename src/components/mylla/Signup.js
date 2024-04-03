import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Assuming you've initialized Firestore somewhere as 'db'
const db = getFirestore();

const Signup = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth(); // Ensure this is destructuring the 'signup' function from useAuth
  const [message, setMessage] = useState('');
  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await signup(email, password); // signup now returns userCredential
        setMessage('Signup successful!');
        
        // Now you can correctly access userCredential.user.uid
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          points: 0, // Default to 0 points
        });
      if (onSignupSuccess) {
        onSignupSuccess(); // If there is a callback, call it upon successful signup
      }
    } catch (error) {
      setMessage(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;