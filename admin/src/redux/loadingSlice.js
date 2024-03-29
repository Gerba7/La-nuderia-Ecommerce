import { createSlice } from '@reduxjs/toolkit';
import { addCategories, addEmail, addProduct, deleteCategory, deleteEmail, deleteProduct, deleteUser, getCategories, getEmails, getOrders, getProducts, getUsers, login, logout, sendEmails, updateOrderStatus, updateProduct, updateUser, updateUserAccess } from './httpRequests';


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
        .addCase(addEmail.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(addEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addEmail.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteEmail.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteEmail.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(getEmails.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getEmails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEmails.rejected, (state) => {
            state.isLoading = false;
        })


        // PRODUCTS
        .addCase(getProducts.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(updateProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(addProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addProduct.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(sendEmails.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(sendEmails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendEmails.rejected, (state) => {
            state.isLoading = false;
        })


        // USERS
        .addCase(getUsers.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUsers.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(updateUserAccess.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(updateUserAccess.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserAccess.rejected, (state) => {
            state.isLoading = false;
        })

        // ORDERS
        .addCase(getOrders.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrders.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(updateOrderStatus.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateOrderStatus.rejected, (state) => {
            state.isLoading = false;
        })

        // CATEGORIES
        .addCase(getCategories.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(addCategories.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(addCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addCategories.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteCategory.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCategory.rejected, (state) => {
            state.isLoading = false;
        })
       
        // LOGIN
        .addCase(login.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(logout.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logout.rejected, (state) => {
            state.isLoading = false;
        })
        
     }
});


export const { resetLoading, setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;