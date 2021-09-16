import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "roommessenger-95b6c.firebaseapp.com",
    projectId: "roommessenger-95b6c",
    storageBucket: "roommessenger-95b6c.appspot.com",
    messagingSenderId: "465553247153",
    appId: "1:465553247153:web:1dd1dd1f58462feecb4b90",
    measurementId: "G-LLZG0E4ZFM"
})

const auth = firebase.auth()

export { auth }
export default firebase 