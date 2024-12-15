// src/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-0yzJB8cWC8ktX1miv_FwfK9cJeyy7U0",
    authDomain: "social-media-app-fbe8c.firebaseapp.com",
    projectId: "social-media-app-fbe8c",
    storageBucket: "social-media-app-fbe8c.firebasestorage.app",
    messagingSenderId: "833211727391",
    appId: "1:833211727391:web:8275d30ab2991e505b5f2a",
    measurementId: "G-3KHQREZQW4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
