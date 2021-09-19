import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import app from '../../../firebase/firebase'

import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import GoogleButton from 'react-google-button'

import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'

import JoinRoom from './JoinRoom'
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setUser } from '../../../redux/slice/slice'


const auth = getAuth();

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
    const dispatch = useDispatch()
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch(setUser({ user: result.user }))
                console.log('user', result.user)
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    return (
        <GoogleButton
            onClick={signInWithGoogle}
        />
    )
}

export default function FrontPage() {
    const [username, setUsername] = useState("")
    const [roomName, setRoomName] = useState("")
    const user = useSelector(selectUser)

    const classes = useStyles()

    return (
        <Fade in timeout={1500}>
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