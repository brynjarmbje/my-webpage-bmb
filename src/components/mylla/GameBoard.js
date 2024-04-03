import React from 'react';

export default function GameBoard({ cells, onCellClick }) {
  return (
    <div className="board">
      {cells.map((cell, index) => (
        <div key={index} className={`cell ${cell ? 'filled' : ''}`} onClick={() => onCellClick(index)}>
          {cell}
        </div>
      ))}
    </div>
  );
}