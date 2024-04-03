import React, { useState, useContext } from 'react';
import { AuthContext, useAuth } from '../../AuthContext'; // Adjust the import path as needed
import GameController from './GameController';
import GameFinder from './GameFinder';
import UserProfile from './UserProfile';
import Login from './Login'; // Assuming you have a separate Login component
import Signup from './Signup'; // Assuming you have a separate Signup component
import '../../styles/MyllaBoard.css';
import GameBoard from './GameBoard';

const MyllaBoard = () => {
  const { currentUser } = useAuth(); // Use your AuthContext to check if the user is logged in
  const [currentSessionId, setCurrentSessionId] = useState(null); // Track the current game session ID
  const [showLogin, setShowLogin] = useState(false); // State to toggle between login and the game view

  const [practiceCells, setPracticeCells] = useState(Array(9).fill(null));
  const [onlineCells, setOnlineCells] = useState(Array(9).fill(null));
  const [isInGameSession, setIsInGameSession] = useState(false);

    // Handle click for the practice board
    const handlePracticeClick = (index) => {
      const newCells = [...practiceCells];
      newCells[index] = newCells[index] ? null : 'X'; // Toggle X on click for simplicity
      setPracticeCells(newCells);
    };
  
    // Handle click for the online game board
    const handleOnlineClick = (index) => {
      if (!isInGameSession) return; // Do nothing if not in a game session
      // Add logic to update the cell in the context of an online game session
      const newCells = [...onlineCells];
      newCells[index] = 'X'; // Simplified for example
      setOnlineCells(newCells);
      // You would also need to sync this action with the backend / game session
    };

  // Function to be called when a session is created or joined
  const handleSessionCreated = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  if (!currentUser) {
    // If the user is not logged in, show login or signup options
    return (
      <div className='myllaPage'>
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
      <UserProfile user={currentUser} />
      {!currentSessionId ? (
        // If there's no current session ID, show the GameFinder to create or join a game session
        <GameFinder onSessionCreated={handleSessionCreated} />
      ) : (
        // If there's a current session ID, show the GameController to manage the game
        <GameController sessionId={currentSessionId} />
      )}
            {/* Optionally, a button to toggle isInGameSession for testing */}
            <button onClick={() => setIsInGameSession(!isInGameSession)}>
        {isInGameSession ? 'Leave Game Session' : 'Join Game Session'}
      </button>
            {/* Online GameBoard (shown based on game session state) */}
            {isInGameSession && (
        <div>
          <h2>Online Game</h2>
          <GameBoard cells={onlineCells} onCellClick={handleOnlineClick} />
        </div>
      )}

      {/* Practice GameBoard (always shown) */}
      <div style={{marginTop: '20px'}}>
        <h2>Practice Area</h2>
        <GameBoard cells={practiceCells} onCellClick={handlePracticeClick} />
      </div>
    </div>
  );
};

export default MyllaBoard;