import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { NavLink } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'

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

export default function FrontPage() {
    const classes = useStyles();

    return (
        <Fade in timeout={2000}>
            <div className={classes.root}>
                <Paper elevation={5} className={classes.front}>
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
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Room Name"
                                        variant="outlined"
                                        type="text"
                                        size="small"
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
                </Paper>
            </div>
        </Fade >
    )
}