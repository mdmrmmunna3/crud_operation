// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8xc0Exb9xFZwSDAFc6S-jWBVNqE8GUUg",
    authDomain: "react-crud-firebase-2f71d.firebaseapp.com",
    projectId: "react-crud-firebase-2f71d",
    storageBucket: "react-crud-firebase-2f71d.firebasestorage.app",
    messagingSenderId: "723299827991",
    appId: "1:723299827991:web:a09d5e8a28d4c6cfe7f752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);