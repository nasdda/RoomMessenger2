import React, { useState, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import IconButton from '@material-ui/core/IconButton'

import EmojiPicker from './EmojiPicker'


const useStyles = makeStyles((theme) => ({
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
        borderRadius: "50%",
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

function InputArea(props) {
    const [inputText, setInputText] = useState("")
    const [toggleEmoji, setToggleEmoji] = useState(false)
    const emojiIconRef = useRef(null)
    const classes = useStyles()

    return (
        <div className={classes.input}>
            <form
                className={classes.textForm}
                onSubmit={event => {
                    event.preventDefault()
                    props.sendMessage(inputText)
                    setInputText("")
                }}>
                <div className={classes.emojiControl}>
                    {toggleEmoji &&
                        <EmojiPicker
                            setInputText={setInputText}
                            inputText={inputText}
                            setToggleEmoji={setToggleEmoji}
                            emojiIconRef={emojiIconRef}
                        />
                    }
                    <IconButton
                        color="primary"
                        aria-label="Emojis"
                        component="span"
                        className={classes.emojiButton}
                        ref={emojiIconRef}
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
    )
}


export default React.memo(InputArea)