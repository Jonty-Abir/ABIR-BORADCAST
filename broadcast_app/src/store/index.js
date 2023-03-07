import { configureStore } from '@reduxjs/toolkit';
import activeSclice from "./activeSclice";
import auth from './authSlice';

export const store = configureStore({
    reducer: {
        auth,
        activeSclice
    },
});