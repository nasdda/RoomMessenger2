import React, { useState } from 'react'

import { Toolbar, IconButton } from '@material-ui/core'
import Bar from '@material-ui/core/AppBar'
import UsersIcon from '@material-ui/icons/Group'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './sidebar'

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
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    return (
        <Bar position="static" className={classes.appbar}>
            <Sidebar
                open={open}
                setOpen={setOpen}
            />
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarItem}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.emojiButton}
                        component="span"
                        onClick={() => setOpen(!open)}
                    >
                        <UsersIcon />
                    </IconButton>
                </div>
                <div className={classes.toolbarItem}>
                    <div>
                        {props.roomName}
                    </div>
                </div>
                <div className={classes.toolbarItem} />
            </Toolbar>
        </Bar>
    )
}


export default React.memo(AppBar)