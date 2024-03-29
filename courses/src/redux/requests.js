
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api/axios";




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


// -- ORDERS


export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (order, thunkAPI) => {
        try {
            const res = await publicRequest.post('/orders', order);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
);



// -- USERS

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (user, thunkAPI) => {
      try {
          const res = await publicRequest.post('/auth/signup', user);
          return res.data;
      } catch (err) {
          console.log(err)
          return thunkAPI.rejectWithValue(err.response.data)
      }
      
  }
);


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


export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            const res = await publicRequest.put("/auth/forgotPassword", email);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkAPI) => {
        try {
            const res = await publicRequest.put("/auth/resetPassword", data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);


export const orderEmail = createAsyncThunk(
    'order/sendEmails',
    async (order, thunkAPI) => {
        try {
            const res = await publicRequest.post("/payments/order-mail", order);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
);