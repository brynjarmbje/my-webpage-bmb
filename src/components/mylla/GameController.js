import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase-config';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';

const GameController = ({ sessionId }) => {
    const { currentUser } = useAuth();
    const [gameSessionData, setGameSessionData] = useState(null);
    const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(false);

    useEffect(() => {
        if (!sessionId) return;

        const unsubscribe = onSnapshot(doc(db, "gameSessions", sessionId), (doc) => {
            if (doc.exists()) {
                setGameSessionData(doc.data());
            } else {
                console.error("No such game session!");
            }
        });

        return () => unsubscribe();
    }, [sessionId]);

    useEffect(() => {
        if (!gameSessionData || !currentUser) return;

        const currentPlayerSymbol = gameSessionData.player1Id === currentUser.uid ? 'X' : 'O';
        const movesMade = gameSessionData.moves.filter(move => move !== null).length;
        const currentTurnSymbol = movesMade % 2 === 0 ? 'X' : 'O';
        setIsCurrentUserTurn(currentPlayerSymbol === currentTurnSymbol);
    }, [gameSessionData, currentUser]);

    const handlePlayerMove = async (index) => {
        if (!isCurrentUserTurn || gameSessionData.moves[index]) return;

        const newMoves = [...gameSessionData.moves];
        newMoves[index] = isCurrentUserTurn ? 'X' : 'O';

        try {
            await updateDoc(doc(db, "gameSessions", sessionId), {
                moves: newMoves,
            });
        } catch (error) {
            console.error("Error updating moves:", error);
        }
    };

    const checkWinner = (moves) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
                return moves[a];
            }
        }
        return null;
    };

    const calculateGameStatus = () => {
        const winner = checkWinner(gameSessionData.moves);
        if (winner) {
            return winner === (gameSessionData.player1Id === currentUser.uid ? 'X' : 'O') ? 'You won!' : 'You lost.';
        } else if (!gameSessionData.moves.includes(null)) {
            return "It's a draw.";
        } else {
            return isCurrentUserTurn ? "Your turn" : "Opponent's turn";
        }
    };

    if (!sessionId || !gameSessionData) {
        return <div>Waiting for game to start...</div>;
    }

    return (
        <>
            <GameStatus status={calculateGameStatus()} />
            <GameBoard cells={gameSessionData.moves} onCellClick={handlePlayerMove} isCurrentUserTurn={isCurrentUserTurn} />
        </>
    );
};

export default GameController;