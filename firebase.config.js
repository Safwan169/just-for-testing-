// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAORBHwcJIFnAdP0OKekDrXDncAEksCdwY",
  authDomain: "e-commerce-6574b.firebaseapp.com",
  projectId: "e-commerce-6574b",
  storageBucket: "e-commerce-6574b.appspot.com",
  messagingSenderId: "945547669835",
  appId: "1:945547669835:web:1ac8ba085eb625036338ce",
  measurementId: "G-T1WV0YX3WL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);