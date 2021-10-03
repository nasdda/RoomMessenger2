
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        roomName: "",
        messages: [],
        userInfos: {}
    },
    reducers: {
        addMessage: (state, action) => {
            const new_messages = [...state.messages, action.payload.message]
            new_messages.sort((a, b) => { return a.data().createdAt - b.data().createdAt })
            state.messages = new_messages
        },
        emptyMessages: (state) => {
            state.messages = []
        },
        setGlobalRoomName: (state, action) => {
            state.roomName = action.payload.roomName
        },
        emptyUsernames: (state) => {
            state.usernames = {}
        },
        addUserinfo: (state, action) => {
            state.userInfos = {
                ...state.userInfos,
                [action.payload.uid]: {
                    username: action.payload.username,
                    photoURL: action.payload.photoURL,
                    isHost: action.payload.isHost
                }
            }
        }
    }
})


export const {
    addMessage, emptyMessages, setChatEndRef,
    setGlobalRoomName, addUserinfo, emptyUsernames
} = slice.actions

export const selectMessages = state => state.main.messages
export const selectRoomName = state => state.main.roomName
export const selectUserInfos = state => state.main.userInfos

export default slice.reducer