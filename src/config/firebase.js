import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Y8MmezcVtEjXxngmJ8kpyFFU0q6fe9s",
  authDomain: "poolog-e1842.firebaseapp.com",
  projectId: "poolog-e1842",
  storageBucket: "poolog-e1842.appspot.com",
  messagingSenderId: "489440481717",
  appId: "1:489440481717:web:804a5f78462d88b9bd49fc",
  databaseURL: "https://poolog-e1842-default-rtdb.europe-west1.firebasedatabase.app/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const auth = getAuth(app);