
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        roomName: "",
        messages: [],
        usernames: {}
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
        addUsername: (state, action) => {
            state.usernames = {
                ...state.usernames,
                [action.payload.uid]: action.payload.username
            }
        }
    }
})


export const {
    addMessage, emptyMessages, setChatEndRef,
    setGlobalRoomName, addUsername
} = slice.actions

export const selectMessages = state => state.main.messages
export const selectRoomName = state => state.main.roomName
export const selectUsernames = state => state.main.usernames

export default slice.reducer