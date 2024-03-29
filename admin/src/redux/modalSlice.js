import { createSlice } from '@reduxjs/toolkit';
import { addCategories, addEmail, addProduct, deleteCategory, deleteEmail, deleteProduct, deleteUser, getCategories, getEmails, getOrders, getProducts, getUsers, login, logout, sendEmails, updateOrderStatus, updateProduct, updateUser, updateUserAccess } from './httpRequests';


export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        setModal: (state) => {
            state.isOpen = true;
        },
        resetModal: (state) => {
            state.isOpen = false;
        }
    },
    
        
    }
);


export const { resetModal, setModal } = modalSlice.actions;

export default modalSlice.reducer;