import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAqi21QS9RHhLX0us_ueiremS9hHZ63-Jw",
  authDomain: "react-full-c162f.firebaseapp.com",
  projectId: "react-full-c162f",
  storageBucket: "react-full-c162f.appspot.com",
  messagingSenderId: "232162487824",
  appId: "1:232162487824:web:0d3294f0e27c55b5ad6495"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
