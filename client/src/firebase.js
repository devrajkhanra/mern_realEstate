// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "mern-realestate-e5ee2.firebaseapp.com",
  projectId: "mern-realestate-e5ee2",
  storageBucket: "mern-realestate-e5ee2.appspot.com",
  messagingSenderId: "628254608722",
  appId: "1:628254608722:web:29675c7cdc3260bbe6be8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);