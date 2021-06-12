import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAxSg8I4uT2M_ghw5qrdnGNu8yv-3jLYuk",
  authDomain: "vacunat-3b4de.firebaseapp.com",
  projectId: "vacunat-3b4de",
  storageBucket: "vacunat-3b4de.appspot.com",
  messagingSenderId: "991799151611",
  appId: "1:991799151611:web:592107806104cbd2bb595e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();

export const firestore = firebaseApp.firestore();