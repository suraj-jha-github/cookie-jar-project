// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkSVwPiKkOFlikO3GfgfJ7KzKcCtr0tYA",
  authDomain: "expense-tracker-e40c0.firebaseapp.com",
  projectId: "expense-tracker-e40c0",
  storageBucket: "expense-tracker-e40c0.firebasestorage.app",
  messagingSenderId: "75774769533",
  appId: "1:75774769533:web:b3d3aa772362626ed2f414",
  measurementId: "G-HVYTFX7Y19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const analytics = getAnalytics(app);

export {app,auth};