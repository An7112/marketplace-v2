
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { allReducers } from "./provider";
export const store = configureStore({
    reducer: allReducers,
    middleware: [thunk]
});
export type AppDispatch = typeof store.dispatch