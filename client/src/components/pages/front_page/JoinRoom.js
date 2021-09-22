import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { NavLink, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import {
    collection, getFirestore, getDoc,
    doc, setDoc
} from "firebase/firestore"

import encrypt from '../../../tools/encrypt'

const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: "none",
        color: "inherit",
    },
    button: {
        width: "10rem",
    }
}));

const db = getFirestore()
const auth = getAuth()

function JoinRoom(props) {
    const [roomNameError, setRoomNameError] = useState({ hasError: false, errorCause: "" })
    const [usernameError, setUsernameError] = useState({ hasError: false, errorCause: "" })
    const [roomName, setRoomName] = useState("")
    const [username, setUsername] = useState("")
    const [user] = useAuthState(auth)

    const classes = useStyles()
    const history = useHistory()

    const handleJoinRoom = () => {
        const parsedUsername = username.trim()
        const parsedRoomName = roomName.trim()
        if (parsedUsername && usernameError.hasError) {
            setUsernameError({
                hasError: false
            })
        }
        if (parsedRoomName && roomNameError.hasError) {
            setRoomNameError({
                hasError: false
            })
        }

        if (parsedUsername) {
            if (parsedRoomName) {
                getDoc(doc(db, "rooms", parsedRoomName)).then(roomRef => {
                    if (roomRef.exists()) {
                        const roomPassword = roomRef.data().password
                        if (roomPassword.length !== 0) {
                            const enteredPassword = prompt("Joining this room requires a password.\nPassword:")
                            if (encrypt(enteredPassword) !== roomPassword) {
                                alert("Incorrect password.")
                                return
                            }
                        }

                        getDoc(doc(collection(db, "rooms", parsedRoomName, "users"), user.uid)).then(userDoc => {
                            if (userDoc.exists()) {
                                alert(`You are already in this room as: ${userDoc.data().username}`)
                                history.push(`/chatroom?room=${parsedRoomName}`)
                            } else {
                                setDoc(doc(collection(db, "rooms", parsedRoomName, "users"), user.uid), {
                                    username: parsedUsername,
                                    isHost: false,
                                    joinedAt: Date.now()
                                }).then(() => {
                                    history.push(`/chatroom?room=${parsedRoomName}`)
                                })
                            }
                        })
                    } else {
                        setRoomNameError({
                            hasError: true,
                            errorCause: "Failed to find room."
                        })
                        return
                    }
                })
            } else {
                setRoomNameError({
                    hasError: true,
                    errorCause: "Room Name cannot be empty"
                })
                return
            }
        } else {
            setUsernameError({
                hasError: true,
                errorCause: "Username cannot be empty"
            })
            return
        }
    }

    const usernameLengthLimit = 20
    const roomNameLengthLimit = 25

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
                            error={usernameError.hasError}
                            helperText={usernameError.hasError && usernameError.errorCause}
                            onChange={event => {
                                if (event.target.value.length <= usernameLengthLimit) {
                                    setUsername(event.target.value)
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Room Name"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={roomName}
                            error={roomNameError.hasError}
                            helperText={roomNameError.hasError && roomNameError.errorCause}
                            onChange={event => {
                                if (event.target.value.length <= roomNameLengthLimit) {
                                    setRoomName(event.target.value)
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={1}>
                            <Grid item>
                                <div>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color={"primary"}
                                        onClick={handleJoinRoom}
                                        fullWidth>
                                        Join
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item>
                                <div>
                                    <NavLink
                                        to="/room-creation"
                                        className={classes.linkText}>
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            color={"primary"}
                                            fullWidth>
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



export default React.memo(JoinRoom)