import React, { useState, useEffect, useMemo } from 'react'

import app from '../../../firebase/firebase'

import { makeStyles } from '@material-ui/core/styles'

import ChatBox from './chat_box'
import InputArea from './input_area'

import {
    collection, addDoc, getFirestore,
    query, getDocs, limit, doc,
    onSnapshot, orderBy
} from "firebase/firestore"

import {
    selectMessages, addMessage, emptyMessages,
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


function ChatRoom(props) {
    const classes = useStyles()
    const [user] = useAuthState(auth)
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    useEffect(() => {
        dispatch(emptyMessages())
        const q2 = query(collection(db, "rooms", params.room, "messages"), orderBy("createdAt", "desc"), limit(25))
        const unsubscribe = onSnapshot(q2, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    dispatch(addMessage({ message: change.doc }))
                }
            })
        })

        return (() => { unsubscribe() })
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


export default ChatRoom