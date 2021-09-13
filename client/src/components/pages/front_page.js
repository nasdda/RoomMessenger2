import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { NavLink } from 'react-router-dom'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'

import GoogleButton from 'react-google-button'


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


function JoinRooms() {
    const [username, setUsername] = useState("")
    const [roomName, setRoomName] = useState("")
    const classes = useStyles();
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>

            <Grid item>
                <Typography variant="h4" color="textSecondary">
                    Join Room
                </Typography>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <TextField
                            label="Username"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={username}
                            onChange={event => { setUsername(event.target.value) }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Room Name"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={roomName}
                            onChange={event => { setRoomName(event.target.value) }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={1}>
                            <Grid item>
                                <div>
                                    <NavLink to="/chatroom" className={classes.linkText}>
                                        <Button variant="contained" color={"primary"} fullWidth>
                                            Join
                                        </Button>
                                    </NavLink>
                                </div>
                            </Grid>
                            <Grid item>
                                <div>
                                    <NavLink to="/chatroom" className={classes.linkText}>
                                        <Button variant="contained" color={"primary"} fullWidth>
                                            Create Room
                                        </Button>
                                    </NavLink>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
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
        <Fade in timeout={2000}>
            <div className={classes.root}>
                <Paper elevation={5} className={classes.front}>
                    {user ? <JoinRooms /> : <SignIn />}
                </Paper>
            </div>
        </Fade>
    )
}