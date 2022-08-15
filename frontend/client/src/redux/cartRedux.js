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
    //ADD PRODUCT TO CART
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

    //REMOVE PRODUCT FROM CART
    removeProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removeProductSuccess: (state, action) => {
      state.isFetching = false;
      state.quantity = state.quantity - 1;
      state.total =
        state.total -
        state.products[
          state.products.findIndex(
            (product) => product.cartProductId === action.payload
          )
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
    removeProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    increaseTotal: (state, action) => {
      if (action.payload.type === "inc") {
        for (let i = 0; i < state.products.length; i++) {
          if (state.products[i].cartProductId === action.payload.id) {
            state.total = state.total + action.payload.amount;
            state.products[i].quantity = state.products[i].quantity + 1;
          }
        }
      } else {
        for (let i = 0; i < state.products.length; i++) {
          if (state.products[i].cartProductId === action.payload.id) {
            state.total = state.total - action.payload.amount;
            state.products[i].quantity = state.products[i].quantity - 1;
          }
        }
      }
    },
  },
});

// export const { addProduct, removeProduct } = cartSlice.actions;
export const {
  addProduct,
  removeProduct,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  removeProductStart,
  removeProductSuccess,
  removeProductFailure,
  increaseTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
