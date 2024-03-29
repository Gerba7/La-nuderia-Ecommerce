import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import userReducer from './authRedux';
import categoriesReducer from './categoriesSlice';
import ordersReducer from './orderSlice';
import loadingReducer from './loadingSlice';
import alertReducer from './alertSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, category: categoriesReducer , order: ordersReducer,
  loading: loadingReducer, alert: alertReducer })
  
const persistedReducer = persistReducer(persistConfig, rootReducer)
  

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), 
});


export let persistor = persistStore(store);