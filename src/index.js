import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDuny_RKioE1q4hwIohfQpg1FR77-Hce8E",
    authDomain: "chat-firebase-e7476.firebaseapp.com",
    projectId: "chat-firebase-e7476",
    storageBucket: "chat-firebase-e7476.appspot.com",
    messagingSenderId: "289710021219",
    appId: "1:289710021219:web:b8a64322470e8b1f20b656",
    measurementId: "G-QBV7GNX7PR"
};

firebase.initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{ firebase, auth, firestore }}>
        <App />
    </Context.Provider>
);
