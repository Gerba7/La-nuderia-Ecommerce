import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './requests';


export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alert: true,
        message: '',
        type: '',
    },
    reducers: {
        setAlert: (state, action) => {
            state.alert = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        resetAlert: (state) => {
            state.error = false;
            state.success = false;
            state.message = '';
        }
    },
});


export const { resetAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;