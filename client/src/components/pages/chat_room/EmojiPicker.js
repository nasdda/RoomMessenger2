import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    emojiPicker: {
        height: 0,
        width: 0,
        position: 'absolute',
        bottom: "380px"
    },
}))

function EmojiPicker(props) {
    const classes = useStyles()
    return (
        <div className={classes.emojiPicker}>
            <Picker
                onEmojiClick={(event, emojiObject) => {
                    props.setInputText(props.inputText + emojiObject.emoji)
                }}
                preload={false}
            />
        </div>
    )
}



export default React.memo(EmojiPicker)