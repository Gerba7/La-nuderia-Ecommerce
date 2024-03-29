import { createSlice } from '@reduxjs/toolkit';
import { addEmail, deleteEmail, getEmails } from './httpRequests';


export const emailsSlice = createSlice({
    name: 'email',
    initialState: {
        emails: [],
    },
    reducers: {
        resetEmails: (state) => {
            state.emails = []
        }
    },
    extraReducers: (builder) => {
       builder
        .addCase(addEmail.fulfilled, (state, action) => {
            state.emails.push(action.payload);
        })
        .addCase(deleteEmail.fulfilled, (state, action) => {
            state.emails.splice(
                state.emails.findIndex((email) => email._id === action.payload), 1 // deletes from index one position
            )
        })
        .addCase(getEmails.fulfilled, (state, action) => {
            state.emails = action.payload;
        })
    }
});


export const { resetEmails } = emailsSlice.actions;

export default emailsSlice.reducer;