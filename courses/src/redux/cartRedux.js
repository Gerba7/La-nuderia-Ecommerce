import { createSlice } from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        courses: [],
        quantity: 0,
        total: 0,
        dolarTotal: 0,
    },
    reducers: {
        addCourse: (state, action) => {
            state.quantity += 1;
            state.courses.push(action.payload);
            state.total += action.payload.price;
            state.dolarTotal += action.payload.dolarPrice;
        },
        removeCourse: (state, action) => {
            state.quantity -= 1;
            state.courses = state.courses.filter(items => items._id !== action.payload._id);
            state.total -= action.payload.price;
            state.dolarTotal -= action.payload.dolarPrice;
        },
        removeCart: (state) => {
            state.courses = [];
            state.quantity = 0;
            state.total = 0;
            state.dolarTotal = 0;
        },
    },
});


export const { addCourse, removeCourse, removeCart } = cartSlice.actions;
export default cartSlice.reducer;