import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { NavLink } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: "none",
        color: "inherit",
    }
}));


function JoinRoom(props) {
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
                            value={props.username}
                            onChange={event => { props.setUsername(event.target.value) }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Room Name"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={props.roomName}
                            onChange={event => { props.setRoomName(event.target.value) }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={1}>
                            <Grid item>
                                <div>
                                    <NavLink to={`/chatroom?room=${props.roomName}`} className={classes.linkText}>
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



export default React.memo(JoinRoom)