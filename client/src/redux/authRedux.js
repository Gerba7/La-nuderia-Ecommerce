import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './requests';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

    }
});


export const { loginStart, loginSuccess, loginFailure, logoutSuccess,
    logoutStart, logoutFailure } = userSlice.actions;
export default userSlice.reducer;