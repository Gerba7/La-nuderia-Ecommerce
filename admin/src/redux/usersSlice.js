import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUsers, updateUserAccess } from './httpRequests';


export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUserAccess.fulfilled, (state, action) => {
                const course = state.users.find((user) => user._id === action.payload._id)
                if (course) {
                    course.courseAccess = !course.courseAccess
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users.splice(
                    state.users.findIndex((user) => user._id === action.payload), 1 
                )
            })
    }
    
});


export const { getUsersStart, getUsersSuccess, getUsersFailure, 
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure } = usersSlice.actions;

export default usersSlice.reducer;