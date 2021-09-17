import React from 'react'

import ChatContent from './chat_content'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }
}))


function ChatBox(props) {
    const classes = useStyles()
    const messages = props.docs.map(doc => {
        return <ChatContent key={doc.id} message={doc.data().content} />
    }
    )
    return (
        <div className={classes.root}>
            {messages}
        </div>
    )
}


export default React.memo(ChatBox)