// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqsrz15s2eEwxxaI-MpFmQu0iS7e0nJNg",
  authDomain: "docvault-78f1a.firebaseapp.com",
  projectId: "docvault-78f1a",
  storageBucket: "docvault-78f1a.appspot.com",
  messagingSenderId: "526162097016",
  appId: "1:526162097016:web:59144274bb1006379ece8d",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
