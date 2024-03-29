import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './requests';


export const ordersSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
    },
    reducers: {
        removeOrder: (state) => {
            state.orders = [];
        },
        setOrderState: (state, action) => {
            state.orders = action.payload
        },
        setOrderPaid: (state) => {
            if (state.orders.length > 0) {
                state.orders[0].status = 'paid';
              }
        },
        resetOrder : (state) => {
            state.orders = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state) => {
                state.orders = [];
            })

    }
});


export const { removeOrder, setOrderState, setOrderPaid, resetOrder } = ordersSlice.actions;


export default ordersSlice.reducer;