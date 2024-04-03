import React from 'react';
import { useAuth } from '../../AuthContext';
import { query, collection, where, getDocs, updateDoc, doc, addDoc } from '@firebase/firestore';
import { db } from '../../firebase-config';

const GameFinder = ({ onSessionCreated }) => {
    const { currentUser } = useAuth();

    const handleFindGame = async () => {
        if (!currentUser) {
            console.log("No current user found.");
            return;
        }
        
        try {
            // Check for an existing game session that's waiting for a player
            const q = query(collection(db, "gameSessions"), where("status", "==", "waiting"));
            const querySnapshot = await getDocs(q);
            let sessionId;
            
            if (!querySnapshot.empty) {
                // Join the first waiting session
                const gameSessionDoc = querySnapshot.docs[0];
                await updateDoc(doc(db, "gameSessions", gameSessionDoc.id), {
                    player2Id: currentUser.uid,
                    status: "ongoing"
                });
                sessionId = gameSessionDoc.id;
            } else {
                // Create a new game session
                const docRef = await addDoc(collection(db, "gameSessions"), {
                    player1Id: currentUser.uid,
                    moves: Array(9).fill(null),
                    status: "waiting", // Waiting for a second player
                });
                sessionId = docRef.id;
            }

            // Invoke onSessionCreated when a session is successfully created or joined
            onSessionCreated(sessionId);
        } catch (error) {
            console.error("Failed to create or join a game session:", error);
            // Optionally, handle errors (e.g., by setting an error state or displaying a message to the user)
        }
    };

    return (
        <button onClick={handleFindGame} disabled={!currentUser}>Find Game</button>
    );
};

export default GameFinder;