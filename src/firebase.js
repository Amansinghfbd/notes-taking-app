import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6lx0Wd3W2ObgK7gC1MBqBCNYxqGNNRTk",
  authDomain: "notes-app-ed0c6.firebaseapp.com",
  projectId: "notes-app-ed0c6",
  storageBucket: "notes-app-ed0c6.appspot.com",
  messagingSenderId: "567544735673",
  appId: "1:567544735673:web:33c30f328226c25bf2f868",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
