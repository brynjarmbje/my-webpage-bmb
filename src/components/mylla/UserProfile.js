import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const UserProfile = () => {
    const { logout } = useAuth();
    const { currentUser } = useAuth();
    const [userPoints, setUserPoints] = useState('Loading...');

    useEffect(() => {
        // Fetch the user's points from Firestore
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          getDoc(userRef).then((doc) => {
            if (doc.exists()) {
              setUserPoints(doc.data().points || 0); // Default to 0 if no points field
            } else {
              // Handle the case where the document does not exist
              setUserPoints(0);
            }
          }).catch((error) => {
            // Handle any errors that occur during the fetch
            console.error("Error fetching points: ", error);
            setUserPoints('Error loading points');
          });
        }
      }, [currentUser]);
    
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