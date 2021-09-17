import React, { useRef, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: "fit-content",
        maxWidth: "25rem",
        backgroundColor: "#f8e8ff",
        marginBottom: "0.5rem",
        padding: "0.1rem 1rem",
        borderRadius: "1rem"
    }
}))

function ChatContent(props) {
    const endRef = useRef(null);
    const classes = useStyles()

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView();
        }
    })

    return (
        <div className={classes.root}>
            {props.message}
            <div style={{ float: "left", clear: "both" }}
                ref={endRef}>
            </div>
        </div>
    )
}


export default React.memo(ChatContent)