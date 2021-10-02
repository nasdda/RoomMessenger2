import React, { useState, useEffect } from 'react'

import ChatRoomContents from './chat_room_contents'

import {
    collection, getFirestore,
    getDoc, doc
} from "firebase/firestore"

import { getAuth } from "firebase/auth"

import { useHistory } from 'react-router-dom'

const db = getFirestore()
const auth = getAuth()

function ChatRoom() {
    const [verified, setVerified] = useState(false)
    const history = useHistory()
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    useEffect(() => {
        const unsubUser = auth.onAuthStateChanged(user => {
            unsubUser()
            if (!user) {
                alert("Please join rooms through the front page.")
                history.push("/")
            } else {
                getDoc(doc(collection(db, "rooms", params.room, "users"), user.uid)).then(userDoc => {
                    if (!userDoc.exists()) {
                        alert("You have not joined this room.")
                        history.push("/")
                    } else {
                        setVerified(true)
                    }
                })
            }
        })
    }, [])


    return (
        <>
            {verified && <ChatRoomContents />}
        </>
    )
}


export default ChatRoom