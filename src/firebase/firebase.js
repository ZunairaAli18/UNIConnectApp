// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLQVyol5oJmPWQy0GgMyurNlxHDBrENAc",
  authDomain: "uniconnectapp-80798.firebaseapp.com",
  projectId: "uniconnectapp-80798",
  storageBucket: "uniconnectapp-80798.firebasestorage.app",
  messagingSenderId: "50705909873",
  appId: "1:50705909873:web:a88c8cc4238050755033d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };