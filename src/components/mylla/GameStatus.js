import React from 'react';

export default function GameStatus({ winner, isXNext }) {
  return (
    <div className="status">
      {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`}
    </div>
  );
}