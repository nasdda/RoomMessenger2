import React, { useRef, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

const useStyles = makeStyles(theme => ({
    isOthers: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "0.5rem",
        justifyContent: "left",
    },
    isUser: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        marginBottom: "0.5rem",
    },
    userContainer: {
        backgroundColor: "#f8e8ff",
        width: "fit-content",
        maxWidth: "25rem",
        padding: "0 1rem 0.2rem 1rem",
        borderRadius: "1rem"

    },
    othersContainer: {
        backgroundColor: "#e6e6e6",
        width: "fit-content",
        maxWidth: "25rem",
        padding: "0 1rem 0.2rem 1rem",
        borderRadius: "1rem"
    },
}))



function ChatContent(props) {
    const endRef = useRef(null);
    const classes = useStyles()

    const auth = getAuth()
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView();
        }
    })

    return (
        <div className={(user && props.uid === user.uid) ? classes.isUser : classes.isOthers}>
            <div className={(user && props.uid === user.uid) ?
                classes.userContainer : classes.othersContainer}>
                {props.message}
            </div>
        </div>

    )
}


export default React.memo(ChatContent)