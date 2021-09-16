import { initializeApp } from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'


const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "roommessenger-95b6c.firebaseapp.com",
    projectId: "roommessenger-95b6c",
    storageBucket: "roommessenger-95b6c.appspot.com",
    messagingSenderId: "465553247153",
    appId: "1:465553247153:web:1dd1dd1f58462feecb4b90",
    measurementId: "G-LLZG0E4ZFM"
})


export default app