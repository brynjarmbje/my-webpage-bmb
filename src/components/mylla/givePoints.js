import { doc, updateDoc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase-config'; // Adjust this import according to your file structure

async function givePoints(outcome, sessionId) {
    const sessionRef = doc(db, "gameSessions", sessionId);
    const sessionSnap = await getDoc(sessionRef);
    
    if (!sessionSnap.exists()) {
        console.error("Game session does not exist!");
        return;
    }

    const gameData = sessionSnap.data();
    const pointsAwarded = outcome === "draw" ? 10 : 100;

    // Assuming the outcome parameter directly tells you who won or if it's a draw
    if (outcome.includes("win")) {
        const winnerId = outcome.includes('X') ? gameData.player1Id : gameData.player2Id;
        await updatePlayerPoints(winnerId, pointsAwarded);
    } else if (outcome === "draw") {
        await updatePlayerPoints(gameData.player1Id, pointsAwarded);
        if (gameData.player2Id) {
            await updatePlayerPoints(gameData.player2Id, pointsAwarded);
        }
    }
}

async function updatePlayerPoints(userId, pointsToAdd) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedPoints = (userData.points || 0) + pointsToAdd;
        await updateDoc(userRef, { points: updatedPoints });
    } else {
        console.error("User document does not exist!");
    }
}

export {givePoints};