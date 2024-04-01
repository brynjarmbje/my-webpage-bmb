import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyllaBoard.css';

const MyllaBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null); // New state to track the winning line

  // Updated winner check function to return winning line indices
  const checkWinner = (cells) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return lines[i]; // Return the indices of the winning combination
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || cells[index]) return; // Early return if game is won or cell is occupied

    const newCells = [...cells];
    newCells[index] = isXNext ? 'X' : 'O';
    setCells(newCells);
    setIsXNext(!isXNext);

    const winningLine = checkWinner(newCells);
    if (winningLine) {
      setWinner(winningLine); // Set the winning line if there's a winner
    }
  };

  const restartGame = () => {
    setCells(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null); // Reset the winner
  };

  return (
    <div className='myllaPage'>
      <h1>Mylla Game</h1>
      <div className="status">
        {winner ? `Winner: ${cells[winner[0]]}` : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell ${winner && winner.includes(index) ? 'winner' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={restartGame}>Restart Game</button>
      <p><Link to="/">Go Back</Link></p>
    </div>
  );
};

export default MyllaBoard;