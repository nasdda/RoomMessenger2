import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
import app from '../../../firebase/firebase'

import { getAuth, signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import GoogleButton from 'react-google-button'

import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'

import JoinRoom from './JoinRoom'
import { CircularProgress } from '@material-ui/core'



const auth = getAuth()

const useStyles = makeStyles((theme) => ({
    root: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    front: {
        height: "fit-content",
        width: "25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 0"
    },
    linkText: {
        textDecoration: "none",
        color: "inherit",
    }
}));



function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <GoogleButton
            onClick={signInWithGoogle}
        />
    )
}

export default function FrontPage() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(true)
    const classes = useStyles()

    auth.onAuthStateChanged(returnedUser => {
        setLoading(false)
    })

    let Display = () => <CircularProgress />

    if(!loading){
        if(user){
            Display = () => <JoinRoom uid={user.uid} />
        } else{
            Display = () => <SignIn />
        }
    }

    return (
        <Fade in timeout={1500}>
            <div className={classes.root}>
                <Paper elevation={5} className={classes.front}>
                    <Display />
                </Paper>
            </div>
        </Fade>
    )
}