import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLBL-pPPGjl2cRdU1pEGlgxiGLAsKq-XU",
  authDomain: "spitfire-75326.firebaseapp.com",
  projectId: "spitfire-75326",
  storageBucket: "spitfire-75326.appspot.com",
  messagingSenderId: "234618307131",
  appId: "1:234618307131:web:a198ed33b83f928d3fd21e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');

export default app
