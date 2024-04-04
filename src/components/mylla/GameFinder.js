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
            // First, try to find an existing session where currentUser is player1 and it's waiting
            const ownSessionQuery = query(
              collection(db, "gameSessions"),
              where("player1Id", "==", currentUser.uid),
              where("status", "==", "waiting")
            );
            let querySnapshot = await getDocs(ownSessionQuery);

            let sessionDoc = querySnapshot.docs.find(doc => doc.exists());

            if (sessionDoc) {
                // Rejoin own waiting session
                onSessionCreated(sessionDoc.id);
                return;
            }

            // If no own waiting session, look for any waiting session
            const anySessionQuery = query(
              collection(db, "gameSessions"),
              where("status", "==", "waiting"),
              where("player1Id", "not-in", [currentUser.uid]) // Exclude own sessions
            );

            querySnapshot = await getDocs(anySessionQuery);
            sessionDoc = querySnapshot.docs.find(doc => doc.exists() && doc.data().player1Id !== currentUser.uid);

            if (sessionDoc) {
                // Join the first suitable waiting session as player2
                await updateDoc(doc(db, "gameSessions", sessionDoc.id), {
                    player2Id: currentUser.uid,
                    status: "ongoing"
                });
                onSessionCreated(sessionDoc.id);
                return;
            }

            // No suitable session to join, create a new one
            const docRef = await addDoc(collection(db, "gameSessions"), {
                player1Id: currentUser.uid,
                moves: Array(9).fill(null),
                status: "waiting"
            });
            onSessionCreated(docRef.id);

        } catch (error) {
            console.error("Failed to create or join a game session:", error);
        }
    };

    return (
        <button onClick={handleFindGame} disabled={!currentUser}>Find Game</button>
    );
};

export default GameFinder;