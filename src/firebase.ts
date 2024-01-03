// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import environments from "./utils/env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: environments.google.apiKey,
  authDomain: environments.google.authDomain,
  projectId: environments.google.projectId,
  storageBucket: environments.google.storageBucket,
  messagingSenderId: environments.google.messagingSenderId,
  appId: environments.google.appId,
  measurementId: environments.google.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Persist Firestore data offline in different tabs
initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});

const db = getFirestore(app);
export { db };
