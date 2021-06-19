import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAxSg8I4uT2M_ghw5qrdnGNu8yv-3jLYuk",
  authDomain: "vacunat-3b4de.firebaseapp.com",
  projectId: "vacunat-3b4de",
  storageBucket: "vacunat-3b4de.appspot.com",
  messagingSenderId: "991799151611",
  appId: "1:991799151611:web:592107806104cbd2bb595e"
};

const loginCodes = {
  "auth/invalid-email": "El correo ingresado no es válido",
  "auth/user-disabled": "El usuario no está disponible",
  "auth/user-not-found": "El usuario no fué encontrado",
  "auth/wrong-password": "Las credenciales no son correctas",
  "auth/email-already-in-use": "Este correo ya está en uso",
  "auth/operation-not-allowed": "Accíon negada por el servidor",
  "auth/weak-password":
    "La contraseña es muy débil, escriba una com más carateres",
};

export const getAuthErrorMsg = (errorCode) => {
  return loginCodes[errorCode] || `Error sin implementar: ${errorCode}` ;
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();

export const firestore = firebaseApp.firestore();