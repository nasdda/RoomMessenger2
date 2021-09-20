import React, { useEffect, useRef } from 'react'
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


function useOutsideAlerter(ref, setToggle, emojiIconRef) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && !emojiIconRef.current.contains(event.target)) {
                setToggle(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function EmojiPicker(props) {
    const classes = useStyles()
    const ref = useRef(null)
    useOutsideAlerter(ref, props.setToggleEmoji, props.emojiIconRef)

    return (
        <div className={classes.emojiPicker} ref={ref}>
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