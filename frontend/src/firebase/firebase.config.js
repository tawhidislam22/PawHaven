
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4WDt6XS_G080EAnbI4aYt5Ii6K3Lsz8E",
  authDomain: "pawhaven-76684.firebaseapp.com",
  projectId: "pawhaven-76684",
  storageBucket: "pawhaven-76684.firebasestorage.app",
  messagingSenderId: "389259885976",
  appId: "1:389259885976:web:eab1b3c8271b508b84bfed"
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
  throw new Error('Firebase configuration is missing.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };