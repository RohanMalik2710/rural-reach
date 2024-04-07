import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAirdctV1oH9n75w8P5lcOND6DvNM27Tw",
    authDomain: "handmade-haven.firebaseapp.com",
    projectId: "handmade-haven",
    storageBucket: "handmade-haven.appspot.com",
    messagingSenderId: "189006563549",
    appId: "1:189006563549:web:2b02344ffbd47907283334",
    measurementId: "G-QQB43XE3MN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth} ;