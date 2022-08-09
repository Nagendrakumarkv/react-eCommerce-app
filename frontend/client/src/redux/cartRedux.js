import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.isFetching = false;
      state.quantity = state.quantity - 1;
      state.total =
        state.total -
        state.products[
          state.products.findIndex((product) => product._id === action.payload)
        ].price *
          state.products[
            state.products.findIndex(
              (product) => product._id === action.payload
            )
          ].quantity;
      if (state.quantity <= 0) {
        state.quantity = 0;
      }
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
