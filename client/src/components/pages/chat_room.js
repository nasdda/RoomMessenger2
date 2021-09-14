import React, { useState } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    chat: {
        flex: "1 1 auto",
        backgroundColor: "white",
        padding: "1rem",
        overflowWrap: 'break-word',
        overflowY: "auto"
    },
    input: {
        flex: "0 1 0",
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        height: "6rem",
        justifyContent: "center",
        alignItems: "center"
    },
    sendButton: {
        height: "1rem",
        width: "1rem",
        borderRadius: "1rem",
        fontSize: "1rem",
        padding: "0.6rem"
    },
    textField: {
        width: "80%",
        margin: "1rem",
        height: "1.5rem",
        borderRadius: "1rem",
        padding: "0.2rem 0.5rem",
        outline: "none",
        fontSize: "1rem",
        "&:focus": {
            border: "2px solid #673ab7"
        }
    }
}));



export default function ChatRoom() {
    const classes = useStyles()
    const [inputText, setInputText] = useState("")
    return (
        <div className={classes.outerContainer}>
            <div className={classes.chat}>

            </div>
            <div className={classes.input}>
                <input
                    placeholder="Message"
                    type="text"
                    value={inputText}
                    onChange={event => { setInputText(event.target.value) }}
                    className={classes.textField}
                />
                <IconButton 
                color="primary" 
                aria-label="Send" 
                component="span"
                className={classes.sendButton}
                >
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )

}