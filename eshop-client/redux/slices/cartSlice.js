import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload.product;
      const id = product._id.$oid ? product._id.$oid : product._id;

      const existingItem = state.items.find((item) => item.product._id === id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        const newItem = {
          ...action.payload,
          product: { ...product, _id: id },
          quantity: 1,
        };
        state.items.push(newItem);
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

//actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

//reducer za store
export default cartSlice.reducer;
