import React, { useEffect, useState } from 'react'

// eslint-disable-next-line no-unused-vars
import app from '../../../firebase/firebase'

import { makeStyles } from '@material-ui/core/styles'

import ChatBox from './chat_box'
import InputArea from './input_area'

import {
    collection, addDoc, getFirestore,
    query, getDocs, limit,
    onSnapshot, orderBy,
} from "firebase/firestore"

import {
    selectMessages, addMessage, emptyMessages,
    addUsername, emptyUsernames
} from '../../../redux/slice/slice'
import { useDispatch, useSelector } from 'react-redux'

import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'


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
    }
}));


const auth = getAuth()
const db = getFirestore()

function sendMessage(message, roomName, uid, photoURL) {
    message.trim()
    if (!message)
        return
    addDoc(collection(db, "rooms", roomName, "messages"), {
        uid: uid,
        content: message,
        createdAt: Date.now(),
        photoURL: photoURL
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
        dispatch(emptyUsernames())
        dispatch(emptyMessages())

        const q1 = query(collection(db, "rooms", params.room, "users"), orderBy("joinedAt", "desc"))
        const unsubscribeUsers = onSnapshot(q1, (usersQuerySnapshot) => {
            usersQuerySnapshot.docChanges().forEach(userChange => {
                if (userChange.type === "added") {
                    console.log(userChange.doc.id, userChange.doc.data().username)
                    dispatch(addUsername({
                        uid: userChange.doc.id,
                        username: userChange.doc.data().username
                    }))
                }
            })
        })

        const q2 = query(collection(db, "rooms", params.room, "messages"), orderBy("createdAt", "desc"), limit(25))
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
            sendMessage(message, params.room, user.uid, user.photoURL)
        }
    }

    return (
        <div className={classes.outerContainer}>
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