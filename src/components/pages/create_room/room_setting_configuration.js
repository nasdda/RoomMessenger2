import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Grid, Typography, TextField,
    Button, CircularProgress
} from '@material-ui/core'

import { NavLink, useHistory } from 'react-router-dom'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: "none",
        color: "inherit",
    },
    button: {
        width: "10rem"
    }
}));

const auth = getAuth()

const max_username_length = 25
const max_room_name_length = 30

function RoomSettingConfiguration(props) {
    const [roomName, setRoomName] = useState("")
    const [hostName, setHostName] = useState("")
    const [password, setPassword] = useState("")
    const [roomNameError, setRoomNameError] = useState({ hasError: false })
    const [hostNameError, setHostNameError] = useState({ hasError: false })
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth)
    const classes = useStyles()
    const history = useHistory()

    return (
        <>
            {loading ?
                <CircularProgress /> :
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <Typography variant="h4" color="textSecondary">
                            Room Creation
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
                                    error={roomNameError.hasError}
                                    helperText={roomNameError.cause}
                                    label="Room Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={roomName}
                                    onChange={event => {
                                        if (event.target.value.length <= max_room_name_length) {
                                            setRoomName(event.target.value)
                                        }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={hostNameError.hasError}
                                    helperText={hostNameError.cause}
                                    label="Host Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={hostName}
                                    onChange={event => {
                                        if (event.target.value.length <= max_username_length) {
                                            setHostName(event.target.value)
                                        }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    size="small"
                                    value={password}
                                    onChange={event => {
                                        if (!(event.target.value.length > 0 && event.target.value[event.target.value.length - 1] === ' ')) {
                                            setPassword(event.target.value)
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
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            color={"primary"}
                                            fullWidth
                                            onClick={() => {
                                                const parsedRoomName = roomName.trim()
                                                const parsedHostName = hostName.trim()
                                                if (parsedRoomName === "") {
                                                    setRoomNameError({
                                                        hasError: true,
                                                        cause: "Room Name cannot be empty."
                                                    })
                                                    return
                                                } else {
                                                    setRoomNameError({
                                                        hasError: false
                                                    })
                                                }

                                                if (parsedHostName === "") {
                                                    setHostNameError({
                                                        hasError: true,
                                                        cause: "Host Name cannot be empty."
                                                    })
                                                    return
                                                } else {
                                                    setHostNameError({
                                                        hasError: false
                                                    })
                                                }
                                                if (!user) {
                                                    alert("Please login first.")
                                                    history.push('/')
                                                } else {
                                                    setLoading(true)
                                                    props.handleRoomCreation({
                                                        roomName: roomName,
                                                        hostName: hostName,
                                                        password: password,
                                                        hostUid: user.uid,
                                                        photoURL: user.photoURL
                                                    }, history).then(result => {
                                                        if (result === "error") {
                                                            setLoading(false)
                                                        }
                                                    })
                                                }
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <NavLink
                                            to="/"
                                            className={classes.linkText}>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color={"primary"}
                                                fullWidth>
                                                Cancel
                                            </Button>
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}


export default RoomSettingConfiguration