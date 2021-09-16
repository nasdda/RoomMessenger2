import React, { useState } from 'react'

import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { makeStyles } from '@material-ui/core/styles'

import SendIcon from '@material-ui/icons/Send'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import IconButton from '@material-ui/core/IconButton'

import EmojiPicker from '../EmojiPicker'

import firebase from '../../firebase/firebase'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';


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
        overflowY: "auto",
        borderBottom: "2px solid #e0e0e0"
    },
    input: {
        flex: "0 1 0",
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        height: "6rem",
        justifyContent: "center",
        alignItems: "center",
    },
    emojiButton: {
        height: "1rem",
        width: "1rem",
        borderRadius: "1rem",
        fontSize: "1rem",
        padding: "0.5rem"
    },
    textField: {
        width: "80%",
        margin: "1rem 0.5rem",
        height: "1.5rem",
        borderRadius: "1rem",
        padding: "0.2rem 0.5rem",
        outline: "none",
        fontSize: "1rem",
        "&:focus": {
            border: "2px solid #673ab7"
        },
    },
    textForm: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        width: "2rem",
        height: "2rem"
    }
}));



export default function ChatRoom() {
    const classes = useStyles()
    const [inputText, setInputText] = useState("")
    const [toggleEmoji, setToggleEmoji] = useState(false)

    const [user] = useAuthState(auth)
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    console.log(messages)


    return (
        <div className={classes.outerContainer}>
            <div className={classes.chat}>
            </div>
            <div className={classes.input}>
                <form
                    className={classes.textForm}
                    onSubmit={event => {
                        event.preventDefault()
                        console.log(inputText)
                        setInputText("")
                    }}>
                    <div className={classes.emojiControl}>
                        {toggleEmoji &&
                            <EmojiPicker
                                setInputText={setInputText}
                                inputText={inputText}
                            />
                        }
                        <IconButton
                            color="primary"
                            aria-label="Emojis"
                            component="span"
                            className={classes.emojiButton}
                            onClick={() => {
                                setToggleEmoji(!toggleEmoji)
                            }}
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </div>
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
                        component="button"
                        type="submit"
                        className={classes.submitButton}
                    >
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    )

}