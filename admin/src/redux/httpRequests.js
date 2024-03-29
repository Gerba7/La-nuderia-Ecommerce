import { createAsyncThunk } from "@reduxjs/toolkit";
import privateRequest, { publicRequest } from "../api/axios";
import { setAlert } from "./alertSlice";
import { resetProducts } from "./productsSlice";


// -- PRODUCTS


export const resetProductsNow = async (dispatch) => {
    dispatch(resetProducts())
}


export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product, thunkAPI) => {
        try {
            const res = await privateRequest.post("/products", product);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (thunkAPI) => {
        try {
            const res = await publicRequest.get('/products');
            return res.data.products;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
);


export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, thunkAPI) => {
        try {
            const res = await privateRequest.delete(`/products/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (productData, thunkAPI) => {
        const {id, product} = productData
        try {
            await privateRequest.put(`/products/${id}`, product);
            return ({_id: id, product: product});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);



// -- CATEGORIES


export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (thunkAPI) => {
        try {
            const res = await publicRequest.get('/categories');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
);


export const addCategories = createAsyncThunk(
    'categories/addCategories',
    async (category, thunkAPI) => {
        try {
            const res = await privateRequest.post("/categories", category);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, thunkAPI) => {
        try {
            const res = await privateRequest.delete(`/categories/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);




// -- ORDERS


export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async (thunkAPI) => {
        try {
            const res = await privateRequest.get('/orders');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async (orderData, thunkAPI) => {
        const {id, task} = orderData
        try {
            await privateRequest.put(`/orders/${id}`, task);
            return ({_id: id, task: task});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (orderData, thunkAPI) => {
        const {id, status} = orderData
        try {
            const statusPaid = {status: status}
            await privateRequest.put(`/orders/${id}`, statusPaid);
            return ({_id: id, status: status});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateOrderSent = createAsyncThunk(
    'orders/updateOrderSent',
    async (id, thunkAPI) => {
        try {
            await privateRequest.put(`/orders/sent/${id}`);
            return ({_id: id});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


// -- USERS

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (thunkAPI) => {
        try {
            const res = await privateRequest.get('/users');
            return res.data;
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, thunkAPI) => {
        try {
            const res = await privateRequest.delete(`/users/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (userData, thunkAPI) => {
        const {id, user} = userData
        try {
            await privateRequest.put(`/users/${id}`, user);
            return ({_id: id, user: user});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const updateUserAccess = createAsyncThunk(
    'users/updateUserAccess',
    async (userData, thunkAPI) => {
        const {id, bool} = userData
        const boolean = {courseAccess: bool}
        try {
            await privateRequest.put(`/users/${id}`, boolean);
            return ({_id: id, bool: bool});
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const activateCourse = createAsyncThunk(
    'users/activateCourse',
    async (courseData, thunkAPI) => {
        try {
            const res = await privateRequest.post(`/users/purchase-course`, courseData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


// -- NEWSLETTER EMAILS





export const sendEmails = createAsyncThunk(
    'newsletter/sendEmails',
    async (email, thunkAPI) => {
        try {
            const res = await privateRequest.post("/newsletter/sendmail", email);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const getEmails = createAsyncThunk(
    'newsletter/getEmails',
    async (thunkAPI) => {
        try {
            const res = await privateRequest.get('/newsletter');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const deleteEmail = createAsyncThunk(
    'newsletter/deleteEmail',
    async (id, thunkAPI) => {
        try {
            const res = await privateRequest.delete(`/newsletter/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const addEmail = createAsyncThunk(
    'newsletter/addEmail',
    async (mail, thunkAPI) => {
        try {
            const res = await privateRequest.post("/newsletter", mail);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);




// LOGIN


export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            const res = await publicRequest.post("/auth/login", user);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (thunkAPI) => {
        try {
            const res = await publicRequest.post("/auth/logout");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


// ORDERS


export const confirmationEmail = createAsyncThunk(
    'order/confirmationEmail',
    async (order, thunkAPI) => {
        try {
            const res = await publicRequest.post("/orders/confirm-order", order);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);



export const sentMail = createAsyncThunk(
    'order/sentMail',
    async (order, thunkAPI) => {
        try {
            const res = await privateRequest.post("/orders/sent-order", order);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const confirmationCourseEmail = createAsyncThunk(
    'order/confirmationCourseEmail',
    async (order, thunkAPI) => {
        console.log(order)
        try {
            const res = await publicRequest.post("/orders/confirm-course-order", order);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);





