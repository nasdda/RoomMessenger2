
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        username: "",
        roomName: "",
        user: null,
        messages: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
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
    setGlobalRoomName, setGlobalUsername, setUser
} = slice.actions

export const selectMessages = state => state.main.messages
export const selectUsername = state => state.main.username
export const selectRoomName = state => state.main.roomName
export const selectUser = state => state.main.user

export default slice.reducer