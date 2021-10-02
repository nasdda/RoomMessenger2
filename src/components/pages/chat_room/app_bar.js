import React from 'react'

import { Toolbar, Typography, IconButton, ToolbarGroup } from '@material-ui/core'
import Bar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "space-between",
        minHeight: "2.5rem",
    },
    emojiButton: {
        height: "1rem",
        width: "1rem",
        borderRadius: "50%",
        padding: "0.5rem",
    },
    toolbarItem: {
        width: "1.5rem"
    }
}));


function AppBar(props) {
    const classes = useStyles()

    return (
        <Bar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <div classname={classes.toolbarItem}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.emojiButton}
                        component="span"
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className={classes.toolbarItem}>
                    <Typography variant="h7" color="inherit" component="div">
                        {props.roomName}
                    </Typography>
                </div>
                <div className={classes.toolbarItem} />
            </Toolbar>
        </Bar>
    )
}


export default React.memo(AppBar)