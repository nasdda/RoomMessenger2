import React, { useEffect, useRef } from 'react'

import ChatContent from './chat_content'
import Notification from './notification'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    messageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }
}))

function ChatBox(props) {
    const classes = useStyles()
    const endRef = useRef(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView();
        }
    })

    const messages = props.docs.map(doc => {
        const display = doc.data().type === "notification" ?
            <Notification
                key={doc.id}
            >
                {doc.data().content}
            </Notification> :
            <ChatContent
                key={doc.id}
                message={doc.data().content}
                uid={doc.data().uid}
                createdAt={doc.data().createdAt}
                photoURL={doc.data().photoURL}
            />
        return display
    }


    )
    return (
        <div className={classes.root}>
            {messages}
            <div style={{ float: "left", clear: "both" }}
                ref={endRef}>
            </div>
        </div>
    )
}


export default React.memo(ChatBox)