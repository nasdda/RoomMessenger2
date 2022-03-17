import React, { useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
import app from '../../../firebase/firebase'

import { makeStyles } from '@material-ui/core/styles'

import ChatBox from './chat_box'
import InputArea from './input_area'
import AppBar from './app_bar'

import {
    collection, addDoc, getFirestore,
    query, onSnapshot, orderBy,
} from "firebase/firestore"

import {
    selectMessages, addMessage, emptyMessages,
    addUserinfo, emptyUserInfo
} from '../../../redux/slice/slice'
import { useDispatch, useSelector } from 'react-redux'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

import getLATime from '../../../tools/la_time'

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "inherit"
    },
    chat: {
        flex: "1 1 auto",
        backgroundColor: "white",
        padding: "1rem",
        overflowWrap: 'break-word',
        overflowY: "auto",
        borderBottom: "2px solid #e0e0e0",
        width: "inherit"
    }
}));


const auth = getAuth()
const db = getFirestore()

function sendMessage(info) {
    info.message = info.message.trim()
    if (!info.message){
        return
    }
    addDoc(collection(db, "rooms", info.roomName, "messages"), {
        uid: info.uid,
        content: info.message,
        createdAt: info.time,
        photoURL: info.photoURL,
        type: info.type
    })
}



function ChatRoomContents(props) {
    const classes = useStyles()
    const [user] = useAuthState(auth)
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    useEffect(() => {
        dispatch(emptyMessages())
        dispatch(emptyUserInfo())

        const q1 = query(collection(db, "rooms", params.room, "users"), orderBy("joinedAt", "desc"))
        const unsubscribeUsers = onSnapshot(q1, (usersQuerySnapshot) => {
            usersQuerySnapshot.docChanges().forEach(userChange => {
                if (userChange.type === "added") {
                    dispatch(addUserinfo({
                        uid: userChange.doc.id,
                        ...userChange.doc.data()
                    }))
                }
            })
        })

        const q2 = query(collection(db, "rooms", params.room, "messages"))
        const unsubscribeMessages = onSnapshot(q2, (messagesQuerySnapshot) => {
            messagesQuerySnapshot.docChanges().forEach((messageChange) => {
                if (messageChange.type === "added") {
                    dispatch(addMessage({ message: messageChange.doc }))
                }
            })
        })

        return (() => {
            unsubscribeUsers()
            unsubscribeMessages()
        })
    }, []);

    const inputSendMessage = message => {
        if (user) {
            sendMessage({
                type: "message",
                message: message,
                roomName: params.room,
                uid: user.uid,
                photoURL: user.photoURL,
                time: getLATime()
            })
        }
    }

    return (
        <div className={classes.outerContainer}>
            <AppBar roomName={params.room} />
            <div className={classes.chat}>
                <ChatBox
                    docs={messages}
                />
            </div>
            <InputArea
                sendMessage={inputSendMessage} />
        </div>
    )
}


export default ChatRoomContents