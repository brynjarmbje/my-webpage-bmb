import React from 'react';

const GameBoard = ({ cells, onCellClick, isCurrentUserTurn, winningLine }) => {
  // Ensure cells is always an array. If cells is undefined, initialize as an empty array.
  const safeCells = cells || Array(9).fill(null);

  return (
    <div className="board">
      {safeCells.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? 'filled' : ''} ${isCurrentUserTurn ? 'clickable' : ''} ${winningLine && winningLine.includes(index) ? 'winner' : ''}`}
          onClick={() => isCurrentUserTurn && onCellClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;