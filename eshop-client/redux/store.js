import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import cartItemsReducer from "../redux/slices/cartSlice"

const reducers = combineReducers({
  cartItems: cartItemsReducer,  
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
