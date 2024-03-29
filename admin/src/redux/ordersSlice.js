import { createSlice } from '@reduxjs/toolkit';
import { getOrders, updateOrderStatus } from './httpRequests';


export const ordersSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const pay = state.orders.find((order) => order._id === action.payload._id)
                if (pay) {
                    pay.status = action.payload.status
                }
            })
    }
});


export const { getOrdersStart, getOrdersSuccess, getOrdersFailure, 
    updateOrderStart, updateOrderSuccess, updateOrderFailure } = ordersSlice.actions;

export default ordersSlice.reducer;