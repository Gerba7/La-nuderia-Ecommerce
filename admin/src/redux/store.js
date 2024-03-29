import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import categoriesReducer from './categoriesSlice';
import ordersReducer from './ordersSlice';
import usersReducer from './usersSlice';
import emailsReducer from './newsletterSlice';
import alertReducer from './alertSlice';
import loadingReducer from './loadingSlice';
import modalReducer from './modalSlice';
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
    blacklist: ['auth']
};

const rootReducer = combineReducers({ product: productsReducer, category: categoriesReducer,
  order: ordersReducer, user: usersReducer, email: emailsReducer, alert: alertReducer,
  loading: loadingReducer, modal: modalReducer })
  
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