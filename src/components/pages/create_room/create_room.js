import React, { useState } from 'react'

import RoomSettingConfiguration from './room_setting_configuration'

import { makeStyles } from '@material-ui/core/styles'
import {
    Fade,
    Paper
} from '@material-ui/core'

import {
    doc, setDoc, getDoc,
    getFirestore, collection, addDoc
} from "firebase/firestore"

import encrypt from '../../../tools/encrypt'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    creation: {
        width: "25rem",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 0"
    }
}));

const db = getFirestore()

function sendMessage(info) {
    info.message.trim()
    if (!info.message)
        return
    addDoc(collection(db, "rooms", info.roomName, "messages"), {
        uid: info.uid,
        content: info.message,
        createdAt: info.time,
        photoURL: info.photoURL,
        type: info.type
    })
}

async function handleRoomCreation(config, history) {
    config.roomName = config.roomName.trim()
    config.hostName = config.hostName.trim()
    if (!config.hostUid) {
        alert("Please sign in.")
        history.push('/')
    }
    else if (config.roomName !== "") {
        const roomRef = await getDoc(doc(db, "rooms", config.roomName))
        if (roomRef.exists()) {
            alert("Room Name is taken.")
            return "error"
        } else {
            try {
                await setDoc(doc(db, "rooms", config.roomName), {
                    password: config.password ? encrypt(config.password) : "",
                    hostUid: config.hostUid
                })
                const grettingDoc = doc(collection(db, "rooms", config.roomName, "messages"))
                await setDoc(grettingDoc, {
                    content: `Welcome to ${config.roomName}`,
                    uid: "---",
                    createdAt: Date.now(),
                    type: "notification"
                })

                const userDoc = doc(collection(db, "rooms", config.roomName, "users"), config.hostUid)
                const time = Date.now()
                await setDoc(userDoc, {
                    username: config.hostName,
                    isHost: true,
                    joinedAt: time
                })

                sendMessage({
                    type: "notification",
                    message: `${config.hostName} has joined!`,
                    roomName: config.roomName,
                    uid: config.hostUid,
                    photoURL: null,
                    time: time
                })

                history.push(`/chatroom?room=${config.roomName}`)
            } catch (error) {
                alert("Error when creating room.")
                return "error"
            }
        }
    }
}

function CreateRoom() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Fade in timeout={1500}>
                <Paper className={classes.creation}>
                    <RoomSettingConfiguration
                        handleRoomCreation={handleRoomCreation}
                    />
                </Paper>
            </Fade>
        </div>

    )
}

export default CreateRoom