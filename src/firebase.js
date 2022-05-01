import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3uHJ7ebKTgd7pQ2bQEWIGQfI6jHjxgEk",
    authDomain: "whatsapp-clone-1e003.firebaseapp.com",
    projectId: "whatsapp-clone-1e003",
    storageBucket: "whatsapp-clone-1e003.appspot.com",
    messagingSenderId: "361186002952",
    appId: "1:361186002952:web:ba0a33a44da71f8d9069bd",
    measurementId: "G-XGTV3E58PQ"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;