import { createSlice } from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        weight: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
            state.weight += action.payload.weight * action.payload.quantity;
        },
        updateQuantity: (state, action) => {
            state.products.find(item => item._id ===action.payload._id).quantity = action.payload.quantity;
            state.total += action.payload.price * action.payload.sumQuantity;
            state.weight += action.payload.weight * action.payload.sumQuantity;
        },
        addQuantity: (state, action) => {
            state.products.find(item => item._id === action.payload._id).quantity += 1;
            state.total += action.payload.price;
            state.weight += action.payload.weight;
        },
        removeQuantity: (state, action) => {
            state.products.find(item => item._id === action.payload._id).quantity -= 1;
            state.total -= action.payload.price;
            state.weight -= action.payload.weight;
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter(items => items._id !== action.payload._id);
            state.total -= action.payload.price * action.payload.quantity;
            state.weight -= action.payload.weight * action.payload.quantity;
        },
        removeCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.weight = 0;
        },
    },
});


export const { addProduct, updateQuantity, addQuantity, 
    removeQuantity, removeProduct, removeCart } = cartSlice.actions;
export default cartSlice.reducer;