import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Validate required environment variables
const requiredEnvVars = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  // Only log a generic error, do not print actual values
  console.warn('Some Firebase environment variables are missing. Using fallback configuration.');
}

// Firebase configuration with fallbacks for production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDK5hLVeUdFKpFSIRavC8w8ToxGjme75IQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "studlyf21-c702a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "studlyf21-c702a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "studlyf21-c702a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "37791289757",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:37791289757:web:4110c9d397977410485f74",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HJGFGR4Q1Z",
};

// Initialize Firebase with error handling
let app;
let auth;
let analytics;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  analytics = getAnalytics(app);
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // Create fallback auth object to prevent app crashes
  app = initializeApp(firebaseConfig, 'fallback');
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, analytics, db };