import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgXT5-FU2PKitK8TNq9xsUwUn9RQPGIvo",
  authDomain: "whatsapp-clone-73e37.firebaseapp.com",
  projectId: "whatsapp-clone-73e37",
  storageBucket: "whatsapp-clone-73e37.appspot.com",
  messagingSenderId: "1079642092159",
  appId: "1:1079642092159:web:954c59a5d5023d666bc54a"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;