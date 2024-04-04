import React from 'react';

const GameStatus = ({ status, gameOver }) => {
    return (
        <div className="status">
            {status}
            {gameOver && " - Game Over"}
        </div>
    );
};

export default GameStatus;