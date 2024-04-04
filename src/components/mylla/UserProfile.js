import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { doc, onSnapshot } from 'firebase/firestore'; // Import onSnapshot for real-time updates
import { db } from '../../firebase-config';

const UserProfile = () => {
    const { logout, currentUser } = useAuth(); // Combined the destructuring for cleaner code
    const [userPoints, setUserPoints] = useState('Loading...');

    useEffect(() => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);

            // Use onSnapshot for real-time updates
            const unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    setUserPoints(doc.data().points || 0); // Default to 0 if no points field
                } else {
                    // Handle the case where the document does not exist
                    setUserPoints(0);
                }
            }, (error) => {
                // Handle any errors that occur during the fetch
                console.error("Error fetching points: ", error);
                setUserPoints('Error loading points');
            });

            // Clean up the listener when the component unmounts or the user changes
            return () => unsubscribe();
        }
    }, [currentUser]); // Depend on currentUser to re-run the effect when the user logs in or out

    if (!currentUser) {
        return <p>Please log in to view your profile.</p>;
    }

    const handleLogout = async () => {
        try {
            await logout();
            // Handle successful logout, like redirecting to a login page
        } catch (error) {
            // Handle logout errors
            console.error('Logout failed', error);
        }
    };

    return (
        <div>
            <h2>Welcome, {currentUser.email}</h2>
            <p>Current Points: {userPoints !== null ? userPoints : "Loading..."}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserProfile;