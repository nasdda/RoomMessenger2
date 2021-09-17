import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'


import app from '../../../firebase/firebase'
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth'

import GoogleButton from 'react-google-button'

import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'

import JoinRoom from './JoinRoom'


const auth = getAuth();

const useStyles = makeStyles((theme) => ({
    root: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    front: {
        height: "30rem",
        width: "25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 5s;"
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
    }
    return (
        <GoogleButton
            onClick={signInWithGoogle}
        />
    )
}

export default function FrontPage() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState("")
    const [roomName, setRoomName] = useState("")
    const classes = useStyles()

    return (
        <Fade in timeout={2000}>
            <div className={classes.root}>
                <Paper elevation={5} className={classes.front}>
                    {user ?
                        <JoinRoom
                            username={username}
                            setUsername={setUsername}
                            roomName={roomName}
                            setRoomName={setRoomName}
                        /> : <SignIn />}
                </Paper>
            </div>
        </Fade>
    )
}