import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './requests';


export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        resetLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder

        // NEWSLETTER
        .addCase(createOrder.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createOrder.rejected, (state) => {
            state.isLoading = false;
        })
        
        
     }
});


export const { resetLoading, setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;