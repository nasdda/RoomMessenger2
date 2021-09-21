import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import app from '../../../firebase/firebase'

import { getAuth, signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import GoogleButton from 'react-google-button'

import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'

import JoinRoom from './JoinRoom'



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
                alert("Failed to sign in.")
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
    const classes = useStyles()

    return (
        <Fade in timeout={1500}>
            <div className={classes.root}>
                <Paper elevation={5} className={classes.front}>
                    {user ?
                        <JoinRoom
                            uid={user.uid}
                        /> : <SignIn />}
                </Paper>
            </div>
        </Fade>
    )
}