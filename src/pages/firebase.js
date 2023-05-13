import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq2U5wEDnSlP3mRkaRFqiGhIg4HZeNvZ4",
  authDomain: "ingenious-c6d53.firebaseapp.com",
  databaseURL: "https://ingenious-c6d53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ingenious-c6d53",
  storageBucket: "ingenious-c6d53.appspot.com",
  messagingSenderId: "281207934871",
  appId: "1:281207934871:web:748b5496f2888b98a5fed2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const user = auth.currentUser;
const googleAuth = new GoogleAuthProvider();



export { app, auth, db, googleAuth };