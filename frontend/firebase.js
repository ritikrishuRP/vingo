// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-fb995.firebaseapp.com",
  projectId: "vingo-food-delivery-fb995",
  storageBucket: "vingo-food-delivery-fb995.firebasestorage.app",
  messagingSenderId: "282039277497",
  appId: "1:282039277497:web:1bf12b3cc1ec43a052c868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {auth,app};