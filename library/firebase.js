import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeUnfoHc5hJ31YlBBA0-PxcgkUN5UzlD0",
  authDomain: "spitfire-83653.firebaseapp.com",
  projectId: "spitfire-83653",
  storageBucket: "spitfire-83653.appspot.com",
  messagingSenderId: "130298013205",
  appId: "1:130298013205:web:6d4356a67ceaa0af2e501c",
  measurementId: "G-B719L3VGCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');

export default app
