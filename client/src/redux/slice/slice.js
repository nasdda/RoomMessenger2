
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
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
        }
    }
})


export const {
    addMessage, emptyMessages, setChatEndRef
} = slice.actions

export const selectMessages = state => state.main.messages

export default slice.reducer