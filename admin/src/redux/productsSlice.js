import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, getProducts, updateProduct } from './httpRequests';


export const productsSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        // PURGE
        resetProducts: (state) => {
            state.products = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products.splice(
                    state.products.findIndex((product) => product._id === action.payload), 1 
                )
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const productIndex = state.products.findIndex((product) => product._id === action.payload._id)
                if (productIndex) {
                    state.products[productIndex] = action.payload.product;
                }
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
        
     } 
});


export const { resetProducts } = productsSlice.actions;

export default productsSlice.reducer;