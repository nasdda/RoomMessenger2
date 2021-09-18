
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        username: "",
        roomName: "",
        messages: [],
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
        setGlobalUsername: (state, action) => {
            state.username = action.payload.username
        },
        setGlobalRoomName: (state, action) => {
            state.roomName = action.payload.roomName
        }
    }
})


export const {
    addMessage, emptyMessages, setChatEndRef,
    setGlobalRoomName, setGlobalUsername
} = slice.actions

export const selectMessages = state => state.main.messages
export const selectUsername = state => state.main.username
export const selectRoomName = state => state.main.roomName

export default slice.reducer