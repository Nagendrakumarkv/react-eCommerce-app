import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL PRODUCTS
    GetProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    GetProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    GetProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE PRODUCT
    DeleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    DeleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    DeleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UDPATE PRODUCT
    UpdateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    UpdateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[state.products.findIndex((item) => item._id === action.payload.id)]=action.payload.product
    },
    UpdateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD PRODUCT
    AddProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    AddProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload)
    },
    AddProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  GetProductStart,
  GetProductSuccess,
  GetProductFailure,
  DeleteProductStart,
  DeleteProductSuccess,
  DeleteProductFailure,
  UpdateProductStart,
  UpdateProductSuccess,
  UpdateProductFailure,
  AddProductStart,
  AddProductSuccess,
  AddProductFailure
} = productSlice.actions;

export default productSlice.reducer;
