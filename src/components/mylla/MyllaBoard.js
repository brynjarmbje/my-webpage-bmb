import React, { useState, useContext } from 'react';
import { AuthContext, useAuth } from '../../AuthContext'; // Adjust the import path as needed
import GameController from './GameController';
import GameFinder from './GameFinder';
import UserProfile from './UserProfile';
import Login from './Login'; // Assuming you have a separate Login component
import Signup from './Signup'; // Assuming you have a separate Signup component
import '../../styles/MyllaBoard.css';
import MyllaPractice from './MyllaPractice';

const MyllaBoard = () => {
  const { currentUser } = useAuth(); // Use your AuthContext to check if the user is logged in
  const [currentSessionId, setCurrentSessionId] = useState(null); // Track the current game session ID
  const [showLogin, setShowLogin] = useState(false); // State to toggle between login and the game view

  // Function to be called when a session is created or joined
  const handleSessionCreated = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  // Function to leave the current game session
  const handleLeaveGame = () => {
    setCurrentSessionId(null);
  };

  if (!currentUser) {
    // If the user is not logged in, show login or signup options
    return (
      <div className='myllaPage'>
        <h1>Mylla Online</h1>
        {showLogin ? (
          <>
            <Login onLoginSuccess={undefined} />
            <button onClick={() => setShowLogin(false)}>Don't have an account? Sign up</button>
          </>
        ) : (
          <>
            <Signup onSignupSuccess={undefined} />
            <button onClick={() => setShowLogin(true)}>Already have an account? Log in</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className='myllaPage'>
      <h1>Mylla Online</h1>
      <UserProfile user={currentUser} />
      {!currentSessionId ? (
        // If there's no current session ID, show the GameFinder to create or join a game session
        <GameFinder onSessionCreated={handleSessionCreated} />
      ) : (
        // If there's a current session ID, show the GameController to manage the game
        <GameController sessionId={currentSessionId} onSessionCreated={handleSessionCreated} />
      )}
      <button onClick={handleLeaveGame}>Leave Game</button>
      {/* Practice GameBoard (always shown) */}
      <MyllaPractice />
    </div>
  );
};

export default MyllaBoard;