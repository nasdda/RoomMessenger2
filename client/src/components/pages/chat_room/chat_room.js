import React, { useState, useEffect, useMemo } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'

import { makeStyles } from '@material-ui/core/styles'


import ChatBox from './chat_box'
import InputArea from './input_area'

import app from '../../../firebase/firebase'
import {
    collection, addDoc, getFirestore,
    query, getDocs, limit, doc,
    onSnapshot, orderBy
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Unsubscribe } from '@material-ui/icons'

import { selectMessages, addMessage, emptyMessages } from '../../../redux/slice/slice'
import { useDispatch, useSelector } from 'react-redux';


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

function sendMessage(message, uid) {
    message.trim()
    if (!message)
        return
    addDoc(collection(db, "messages"), {
        uid: uid,
        content: message,
        createdAt: Date.now()
    })
}


function ChatRoom() {
    const classes = useStyles()
    const [user] = useAuthState(auth)
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(emptyMessages())
        const q2 = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(25))
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
            sendMessage(message, user.uid)
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