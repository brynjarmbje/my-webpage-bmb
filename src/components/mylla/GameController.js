import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import { useAuth } from '../../AuthContext';
import { doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase-config';
import GameFinder from './GameFinder';

const GameController = ({ sessionId, onSessionCreated }) => {
    const { currentUser } = useAuth();
    const [gameSessionData, setGameSessionData] = useState(null);
    const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameStatus, setGameStatus] = useState('');
    const [winningLine, setWinningLine] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        // Listen for updates to the current game session
        const unsubscribe = onSnapshot(doc(db, "gameSessions", sessionId), async (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setGameSessionData(data);
                if ((data.winner || data.draw) && !gameOver) {
                    setGameOver(true);
                    await awardPoints(data);
                }
                if (data.winner) {
                    setGameStatus(data.winner === currentUser.uid ? 'You won!' : 'You lost.');
                } else if (data.draw) {
                    setGameStatus("It's a draw.");
                }
                // Determine if it's the current user's turn
                const totalMoves = data.moves.filter(move => move !== null).length;
                const isPlayerOne = data.player1Id === currentUser.uid;
                setIsCurrentUserTurn((totalMoves % 2 === 0) === isPlayerOne);
            } else {
                console.error("No such game session!");
            }
        });

        return () => unsubscribe();
    }, [sessionId, currentUser.uid, gameOver]);

    // Handle player move
    const handlePlayerMove = async (index) => {
        if (!isCurrentUserTurn || gameSessionData.moves[index] || gameSessionData.status === 'completed' || gameOver) return;
    
        const newMoves = [...gameSessionData.moves];
        const playerSymbol = gameSessionData.player1Id === currentUser.uid ? 'X' : 'O';
        newMoves[index] = playerSymbol;
    
        const result = checkWinner(newMoves); // Adjusted to expect an object or null
        const draw = !result && newMoves.every(move => move != null);
    
        try {
            await updateDoc(doc(db, "gameSessions", sessionId), {
                moves: newMoves,
                ...(result && { winner: result.winner, status: "completed" }), // Adjusted to use result.winner
                ...(draw && { draw: true, status: "completed" })
            });
            // After updating Firestore, update local state for the winning line if there is a winner
            if (result && result.winningLine) {
                setWinningLine(result.winningLine); // You need to define setWinningLine and winningLine state somewhere in this component
            } else {
                setWinningLine(null); // Reset winning line if no winner
            }
        } catch (error) {
            console.error("Error updating moves:", error);
        }
    };

    // Check for a winner
    const checkWinner = (moves) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
                return {
                    winner: moves[a] === 'X' ? gameSessionData.player1Id : gameSessionData.player2Id,
                    winningLine: line, // winning combination
                };
            }
        }
        if (!moves.includes(null)) return 'draw';
        return null;
    };

    const awardPoints = async (data) => {
        const pointsToAdd = data.draw ? 10 : 100;
        // For draw, update both players. For win, update the winner.
        const usersToUpdate = data.draw ? [data.player1Id, data.player2Id] : [data.winner];
    
        usersToUpdate.forEach(async (userId) => {
            if (userId) { // Ensure userId is not null
                const userRef = doc(db, "users", userId);
                await getDoc(userRef).then(async (userSnap) => {
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        const updatedPoints = (userData.points || 0) + pointsToAdd;
                        await updateDoc(userRef, { points: updatedPoints });
                    }
                }).catch((error) => console.error("Error updating user points:", error));
            }
        });
    };

    if (!sessionId || !gameSessionData) {
        return <div>Waiting for game to start...</div>;
    }

    return (
        <>
            <GameStatus status={gameStatus} gameOver={gameOver} sessionId={sessionId} />
            <GameBoard cells={gameSessionData.moves} onCellClick={handlePlayerMove} isCurrentUserTurn={isCurrentUserTurn} winningLine={winningLine} />
            {gameOver}
        </>
    );
};

export default GameController;