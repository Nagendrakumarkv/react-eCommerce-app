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
    //add the products to cart

    // addProduct: (state, action) => {
    //   state.quantity += 1;
    //   state.products.push(action.payload);
    //   state.total += action.payload.price * action.payload.quantity;
    //   state.checkDuplicateIds=null;
    // },
    addToCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addToCartSuccess: (state, action) => {

      state.isFetching = false;
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      state.checkDuplicateIds = null;
    },
    addToCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //remove the products from cart
    removeProduct: (state, action) => {
      state.isFetching = false;
      state.quantity = state.quantity - 1;
      state.total =
        state.total -
        state.products[
          state.products.findIndex((product) => product.cartProductId === action.payload)
        ].price *
          state.products[
            state.products.findIndex(
              (product) => product.cartProductId === action.payload
            )
          ].quantity;
      if (state.quantity <= 0) {
        state.quantity = 0;
        state.total = 0;
      }
      state.products = state.products.filter(
        (product) => product.cartProductId !== action.payload
      );
    },
  },
});

// export const { addProduct, removeProduct } = cartSlice.actions;
export const { addProduct, removeProduct,addToCartStart,addToCartSuccess,addToCartFailure } = cartSlice.actions;
export default cartSlice.reducer;
