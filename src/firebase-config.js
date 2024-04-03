import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUWUIPJacuvCepO6VcZ5fnygSsJXaktIU",
    authDomain: "mylla-online-game.firebaseapp.com",
    projectId: "mylla-online-game",
    storageBucket: "mylla-online-game.appspot.com",
    messagingSenderId: "824748199884",
    appId: "1:824748199884:web:c2cd4d86924b799c3d5769",
    measurementId: "G-HBNB423JFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };