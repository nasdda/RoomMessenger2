  
import { createSlice } from '@reduxjs/toolkit'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

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

export const slice = createSlice({
    name: "main",
    initialState: {
        user: null,
        auth: auth
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        signInWithGoogle: (state) => {
            const provider = new firebase.auth.GoogleAuthProvider()
            auth.signInWithPopup(provider)
        },
    }
})

export const {
    setUser, signInWithGoogle
} = slice.actions

export const selectUser = state => state.main.user
export const selectAuth = state => state.main.auth
export default slice.reducer