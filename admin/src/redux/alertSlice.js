import { createSlice } from '@reduxjs/toolkit';
import { addCategories, addEmail, addProduct, deleteCategory, deleteEmail, deleteProduct, deleteUser, getCategories, getEmails, getOrders, getProducts, getUsers, login, sendEmails, updateOrderStatus, updateProduct, updateUserAccess } from './httpRequests';


export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alert: false,
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
    extraReducers: (builder) => {
        builder

        // EMAILS
        .addCase(addEmail.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'Email creado con exito!';
            state.type = 'success';
        })
        .addCase(addEmail.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(deleteEmail.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'Email eliminado con exito!';
            state.type = 'success';
        })
        .addCase(deleteEmail.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(getEmails.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error';
        })
        .addCase(sendEmails.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'Newsletter enviado con exito!';
            state.type = 'success';
        })
        .addCase(sendEmails.rejected, (state, action) => {
            state.alert = true;
            state.message = 'Error al enviar newsletter';
            state.type = 'error'
        })
        

        // PRODUCTS
        .addCase(getProducts.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'Producto eliminado con exito!';
            state.type = 'success';
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'El producto se actualizo con exito!';
            state.type = 'success';
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'El producto ha sido creado con exito!';
            state.type = 'success';
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })

        // USERS
        .addCase(getUsers.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(updateUserAccess.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'Usuario eliminado con exito!';
            state.type = 'success';
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })

        // ORDERS
        .addCase(getOrders.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'La orden se actualizo con exito!';
            state.type = 'success';
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })

        // CATEGORIES
        .addCase(getCategories.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(addCategories.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'La categoria se creo con exito!';
            state.type = 'success';
        })
        .addCase(addCategories.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.alert = true;
            state.message = 'La categoria se elimino con exito!';
            state.type = 'success';
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.alert = true;
            state.message = action.payload;
            state.type = 'error'
        })
        
        // LOGIN

        .addCase(login.rejected, (state, action) => {
            state.alert = true;
            state.message = 'El mail o la contraseña son invalidos';
            state.type = 'error'
        })
     }
});


export const { resetAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;