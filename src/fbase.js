import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.React_APP_API_KEY,
  authDomain: process.env.React_APP_AUTH_DOMAIN,
  databaseURL: process.env.React_APP_DATABASE_URL,
  projectId: process.env.React_APP_PROJECT_ID,
  storageBucket: process.env.React_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.React_APP_MESSAGING_ID,
  appId: process.env.React_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbservice = firebase.firestore();
export const storageService = firebase.storage();
