import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    chatArea: {
        width: "100%",
    },
    outerContainer: {
        width: "30rem",
        height: "30rem",
        margin: "auto"
    },
    gridItem: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px"
    }
}));



export default function ChatRoom() {
    const classes = useStyles()
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            className={classes.outerContainer}
        >
            <Grid item className={classes.gridItem}>
                <div>
                    helloo
                </div>
            </Grid>
            <Grid item className={classes.gridItem}>
                <TextField
                    placeholder="Message"
                    variant="outlined"
                    type="text"
                    size="small"
                    fullWidth
                />
            </Grid>
        </Grid>
    )

}