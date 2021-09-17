
import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload.message]
        },
        emptyMessage: state => {
            state.messages = []
        }
    }
})



export const {
    addMessage, emptyMessage
} = slice.actions

export const selectMessages = state => state.main.messages

export default slice.reducer