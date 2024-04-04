import React, { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config'; // Make sure this path is correct

const GameStatus = ({ status, gameOver, sessionId }) => {
    const [players, setPlayers] = useState({ player1Email: 'Loading...', player2Email: 'Loading...' });

    useEffect(() => {
        const fetchPlayerEmails = async (player1Id, player2Id) => {
            const player1Ref = doc(db, "users", player1Id);
            const player1Doc = await getDoc(player1Ref);
            const player1Email = player1Doc.exists() ? player1Doc.data().email : 'Unknown Player';

            let player2Email = 'Awaiting Player...';
            if (player2Id) {
                const player2Ref = doc(db, "users", player2Id);
                const player2Doc = await getDoc(player2Ref);
                player2Email = player2Doc.exists() ? player2Doc.data().email : 'Unknown Player';
            }

            setPlayers({ player1Email, player2Email });
        };

        const sessionRef = doc(db, "gameSessions", sessionId);
        const unsubscribe = onSnapshot(sessionRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const { player1Id, player2Id } = docSnapshot.data();
                fetchPlayerEmails(player1Id, player2Id);
            }
        });

        return () => unsubscribe();
    }, [sessionId]);

    return (
        <div className="status">
            <p>{players.player1Email} vs {players.player2Email}</p>
            <p>{status}</p>
            {gameOver && " - Game Over"}
        </div>
    );
};

export default GameStatus;