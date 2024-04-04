import React, { useState } from 'react';
import GameBoard from './GameBoard'; // Adjust this path if necessary

const MyllaPractice = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handlePracticeClick = (index) => {
    if (cells[index]) return; // Ignore the click if cell is already filled

    const newCells = [...cells];
    newCells[index] = isXNext ? 'X' : 'O';
    setCells(newCells);
    setIsXNext(!isXNext);

    // Check for win or draw and reset if necessary
    if (checkForWin(newCells) || checkForDraw(newCells)) {
      resetGame();
    }
  };

  const checkForWin = (cells) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return true;
      }
    }
    return false;
  };

  const checkForDraw = (cells) => {
    return cells.every(cell => cell);
  };

  const resetGame = () => {
    setCells(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div>
      <h2>Practice Area</h2>
      <GameBoard cells={cells} onCellClick={handlePracticeClick} isCurrentUserTurn={true} />
    </div>
  );
};

export default MyllaPractice;