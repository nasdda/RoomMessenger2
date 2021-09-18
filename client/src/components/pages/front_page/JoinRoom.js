import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { NavLink, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { useDispatch } from 'react-redux'
import { setGlobalRoomName, setGlobalUsername } from '../../../redux/slice/slice'

const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: "none",
        color: "inherit",
    }
}));


function JoinRoom(props) {
    const [roomNameError, setRoomNameError] = useState({ hasError: false, errorCause: "" })
    const [usernameError, setUsernameError] = useState({ hasError: false, errorCause: "" })
    const [roomName, setRoomName] = useState("")
    const [username, setUsername] = useState("")

    const classes = useStyles()
    const history = useHistory()

    const dispatch = useDispatch()

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
                                setUsername(event.target.value)
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
                                setRoomName(event.target.value)
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
                                        variant="contained"
                                        color={"primary"}
                                        onClick={() => {
                                            const parsedUsername = username.trim()
                                            const parsedRoomName = roomName.trim()
                                            if (parsedUsername) {
                                                if (parsedRoomName) {
                                                    history.push(`/chatroom?room=${parsedRoomName}`)
                                                } else {
                                                    setRoomNameError({ hasError: true, errorCause: "Room Name cannot be empty" })
                                                }
                                            } else {
                                                setUsernameError({ hasError: true, errorCause: "Username cannot be empty" })
                                            }
                                        }}
                                        fullWidth>
                                        Join
                                    </Button>
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



export default React.memo(JoinRoom)