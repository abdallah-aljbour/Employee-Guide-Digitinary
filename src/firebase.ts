// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPS6VMpcTH2goa5K-kTzQ7c87n5lyvzfI",
  authDomain: "contact-ad117.firebaseapp.com",
  databaseURL: "https://contact-ad117-default-rtdb.firebaseio.com",
  projectId: "contact-ad117",
  storageBucket: "contact-ad117.appspot.com",
  messagingSenderId: "526458612884",
  appId: "1:526458612884:web:7911b871a9b51ada60d881",
  measurementId: "G-H180DS43SQ",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);